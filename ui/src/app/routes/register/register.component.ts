import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  public showPassword: boolean = false;

  constructor() {}

  ngOnInit(): void {}

}
