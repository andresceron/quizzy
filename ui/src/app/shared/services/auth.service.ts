import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { UsersService } from './users.service';
import { ClientStorage } from './client-storage.service';
import { AuthResponse } from '@interfaces/auth-response.interface';
import { CustomResponse } from '@interfaces/custom-response.interface';
import { AppConstants } from '@constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | false;
  private currentAuthSubject = new BehaviorSubject<AuthResponse | null>(null);

  constructor(
    private apiService: ApiService,
    private usersService: UsersService,
    private cs: ClientStorage
  ) {
    this.cs.logger$.subscribe(data => {
      if (data.storage[AppConstants.authState]) {
        this.currentAuthSubject.next(data.storage[AppConstants.authState]);
      }
    });
  }

  public get currentAuthValue(): AuthResponse | null {
    return this.currentAuthSubject?.value || null;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentAuthSubject?.value?.token;
  }

  public currentAuth(): Observable<AuthResponse | null> {
    return this.currentAuthSubject.asObservable();
  }

  // TODO:: Check why res: CustomResponse gives error
  public login(obj: object) {
    return this.apiService
      .post('auth/login', obj)
      .pipe(
        first(),
        map((res: any) => { // CustomResponse
          if (res?.id && res?.token) {
            this.cs.setItem(AppConstants.authState, res);
            this.usersService.setUser();
            this.token = res.token;
          }

          return res;
        })
      );
  }

  public register(obj: object) {
    return this.apiService
      .post('auth/register', obj)
      .pipe(
        first(),
        map((res: any) => { // CustomResonse
          if (res?.data?._id) {
            return res.data;
          }
        })
      );
  }

  public resetPassword(obj: object) {
    return this.apiService
        .post('auth/reset-password', obj)
        .pipe(
          first(),
          map((res: any) => { // CustomResonse
            if (res?.data?.status) {
              return res.data.status;
            }
          })
        );
  }

  public validateResetPasswordToken(obj: object) {
    return this.apiService
        .post('auth/validate-password-token', obj)
        .pipe(
          first(),
          map((res: any) => { // CustomResonse
            if (res?.data?.status) {
              return res.data.status;
            }
          })
        );
  }

  public newPassword(obj: object) {
    return this.apiService
        .post('auth/new-password', obj)
        .pipe(
          first(),
          map((res: any) => { // CustomResonse
            if (res?.data) {
              return res.data;
            }
          })
        );
  }

  public logout() {
    this.token = false;
    this.usersService.removeCurrentUser();
    this.cs.removeItem(AppConstants.authState);
    this.currentAuthSubject.next(null);
  }

}
