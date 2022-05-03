import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@interfaces/user.interface';
import { UsersService } from '@services/users.service';
import { first } from 'rxjs';

@Component({
  selector: 'qz-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  public showPassword: boolean = false;
  public formSubmitted: boolean = false;
  public user: User;
  public settingsFormGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.minLength(6), Validators.maxLength(20)]]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  public onSubmit() {
    this.formSubmitted = true;
    if (!this.settingsFormGroup.valid) {
      return;
    }

    if (!!this.user) {
      this.userService
        .updateUser(this.user.id, this.settingsFormGroup.value)
        .pipe(first())
        .subscribe(res => {
          // TODO:: Handle this?
          console.log('res:: ', res);
        });
    }
  }

  private getUserData() {
    this.userService.getUserData().pipe(first()).subscribe((user: User) => {
      this.user = user;
      this.configUserData();
    })
  }

  private configUserData() {
    this.settingsFormGroup.patchValue({
      name: this.user.name,
      email: this.user.email
    });
  }
}
