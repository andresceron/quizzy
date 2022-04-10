import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'qz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public showPassword: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.router.navigate([`/dashboard`]);
  }
}
