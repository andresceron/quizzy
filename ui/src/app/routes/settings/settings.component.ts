import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'qz-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  public showPassword: boolean = false;

  preloadadData = {
    username: 'dummyuser',
    email: 'dummy@user.com',
    password: '1232123'
  }

  public settingsFormGroup: FormGroup = this.fb.group({
    username: [this.preloadadData.username, [Validators.required]],
    email: [this.preloadadData.email, [Validators.required]],
    password: [this.preloadadData.password, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  public onSubmit() {
    console.log(this.settingsFormGroup.value);
  }
}
