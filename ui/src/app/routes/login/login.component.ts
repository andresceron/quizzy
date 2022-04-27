import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from '@interfaces/auth-response.interface';
import { AuthService } from '@services/auth.service';
import { first } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'qz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public showPassword: boolean = false;
  public formSubmitted: boolean = false;

  public loginFg: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  } );

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.formSubmitted = true;
    if (!this.loginFg.valid) {
      return;
    }

    try {
      this.authService.login({
        email: this.loginFg.value.email,
        password: this.loginFg.value.password,
      }).pipe(
        first(),
        catchError(async() => (false))
      ).subscribe((res: AuthResponse) => {
        if (!!res) {
          this.goToPage('dashboard');
        } else {
          this.loginError();
        }
      });
    } catch (err) {
      this.loginError();
    }
  }

  public goToPage(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  public get form(): { [key: string]: AbstractControl } {
    return this.loginFg.controls;
  }

  private loginError() {
    this.loginFg.controls.password.reset();
    this.loginFg.controls.password.setErrors(null);
  }
}
