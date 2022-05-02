import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUserSubject: ReplaySubject<User> = new ReplaySubject<User>(1);
  private user: User;

  constructor(
    private apiService: ApiService
  ) {
  }

  public getUserData(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  public get hasUser() {
    return !!this.user?.id;
  }

  // TODO:: Check why User isnt working
  public setUser(userId: string) {
    this.apiService
    .get(`users/me`)
    .pipe(
      first()
    ).subscribe((res: any) => { // User
      if (res?.id) {
        this.currentUserSubject.next(res);
        this.user = res;
      }
    });
  }

  // TODO: Change to use stored JWT instead
  public getUser(userId: string) {
    return this.apiService
      .get(`users/${userId}`)
      .pipe(
        first(),
        map((res: any) => { // User
          return res;
        })
      );
  }

  public updateUser(userId: string, user: User) {
    return this.apiService
      .put( `users/${userId}`, user)
      .pipe(
        first(),
        map((res: any) => { // User
          if (res?.email) {
            return res;
          }
          return false;
        })
      );
  }

  public deleteUser(userId: string) {
    return this.apiService
      .delete( `users/${userId}`)
      .pipe(
        first(),
        map((res: any) => { // User
          if (res?.email) {
            return res;
          }
          return false;
        })
      );
  }

}
