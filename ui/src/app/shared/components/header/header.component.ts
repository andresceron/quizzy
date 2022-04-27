import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { SDKEventsHandlerService } from '@shared/sdk/events-handler/events-handler.service';
import { SDKEventsHandlerEventType } from '@shared/sdk/events-handler/events-handler.types';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'qz-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerCollapse', [
      state('collapsed', style({
        maxHeight: '0px',
      })),
      state('expanded', style({
        maxHeight: '500px',
      })),
      state('resetCollapsed', style({
        maxHeight: '0px',
      })),
      state('resetExpanded', style({
        maxHeight: 'inherit',
      })),
      transition('collapsed <=> expanded', animate('400ms ease-in')),
      transition('resetCollapsed => collapsed', animate('0ms ease-in')),
      transition('resetCollapsed => expanded', animate('400ms ease-in')),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  public state: string;
  public isQuiz: boolean;
  public isMobile: boolean;
  public isAuthenticated: boolean;
  private activeRoute: string;
  private currentWidth: number;
  private routerSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private eventsHandler: SDKEventsHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.currentWidth = window.innerWidth;
    if (this.currentWidth > 992) {
      this.state = 'resetExpanded';
    } else {
      this.state = 'resetCollapsed';
    }

    this.isAuthenticated = this.authService.isAuthenticated;
    this.initSubscriptions();
  }

  private initSubscriptions() {
    this.routerSubscription = this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.activeRoute = event.url.replace('/', '');
        this.checkRouteQuiz(this.activeRoute);
        this.cdr.markForCheck();
      }
    });

    this.eventsHandler.emitter$
    .pipe(
      filter((event) => event.type === SDKEventsHandlerEventType.WindowResize),
    )
    .subscribe(() => {
      this.checkState();
      this.isMobile = window.innerWidth < 992;
      this.cdr.markForCheck();
    });
  }

  private checkState() {
    this.state = window.innerWidth > 992 ? 'resetExpanded' : 'resetCollapsed';
  }

  private checkRouteQuiz(activeRoute: string) {
    switch (this.router.url) {
      case '/':
      case '/dashboard':
      case '/settings':
      case '/settings':
      case '/join':
      case '/quiz/list':
      case '/quiz/builder':
        this.isQuiz = false;
        break;
      default:
        this.isQuiz = true;
        break;
    }

    if (this.router.url.includes('/user') || this.router.url.includes('/analytics')) {
      this.isQuiz = false;
    }

    this.checkState();
  }

  public animateMe() {
    this.state = this.state !== 'expanded' ? 'expanded' : 'collapsed';
  }

  public menuState() {
    if (window.innerWidth < 992) {
      this.state = 'collapsed';
    }
  }

  public exitQuiz() {
    this.router.navigate(['/quiz/list']);
  }

  public ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
