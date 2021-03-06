import { Component, OnInit } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { UsersService } from '@services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'qz-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public user$: Observable<User>;
  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUserData();
  }
}
