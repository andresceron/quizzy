import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from '@interfaces/error.interface';
import { User } from '@interfaces/user.interface';
import { AuthService } from '@services/auth.service';
import { catchError, first } from 'rxjs';

@Component({
  selector: 'qz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  public showPassword: boolean = false;
  public formSubmitted: boolean = false;
  public submitRegisterError: string;

  public registerFg: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  } );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.formSubmitted = true;
    if (!this.registerFg.valid) {
      return;
    }

    try {
      this.authService.register({
        name: this.registerFg.value.name,
        email: this.registerFg.value.email,
        password: this.registerFg.value.password,
      }).pipe(
        first(),
        catchError(async(e) => (e))
      ).subscribe((res: User) => {
        if (res instanceof HttpErrorResponse && !res.id) {
          this.registerError(res.error);
          return;
        }

        if (!!res.id) {
          this.goToPage('login');
          return;
        }
      });
    } catch (err) {
      this.registerError();
    }
  }

  public goToPage(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  public get form(): { [key: string]: AbstractControl } {
    return this.registerFg.controls;
  }

  private registerError(error?: ErrorResponse) {
    this.registerFg.controls.email.setErrors({ submitError: true });
    this.submitRegisterError = error?.message || 'Something went wrong. Please try again later';
    this.registerFg.controls.password.reset();
    this.registerFg.controls.password.setErrors(null);

    // TODO: Temporal -> change to notification instead?
    setTimeout(() => {
      this.registerFg.controls.email.setErrors(null);
      this.submitRegisterError = '';
    }, 3000);
  }

}
