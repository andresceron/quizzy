import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public showPassword: boolean = false;

  constructor() {}

  ngOnInit(): void {}

}
