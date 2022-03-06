import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qz-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
  public showPassword: boolean = false;

  constructor() {}

  ngOnInit(): void {}

}
