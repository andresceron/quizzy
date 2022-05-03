import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'qz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'QuiZZy';
  public hideHeader: boolean = false;
  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  public ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      switch (this.router.url) {
        case '/login':
        case '/register':
        case '/reset-password':
          this.hideHeader = true;
          break;
        default:
          this.hideHeader = false;
          break;
      }
    });

    if (this.authService.currentAuthValue) {
      this.usersService.setUser();
    }
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
