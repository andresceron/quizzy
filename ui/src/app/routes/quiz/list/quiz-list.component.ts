import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SDKEventsHandlerService } from '@shared/sdk/events-handler/events-handler.service';
import { SDKEventsHandlerEventType } from '@shared/sdk/events-handler/events-handler.types';
import { filter } from 'rxjs';

@Component({
  selector: 'qz-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  animations: [
    trigger('myFirstAnimation', [
      state('collapsed', style({
        height: '0px'
      })),
      state('expanded', style({
        height: '163px',
      })),
      state('resetCollapsed', style({
        height: '0px',
      })),
      state('resetExpanded', style({
        height: 'auto',
      })),
      transition('collapsed <=> expanded', animate('400ms ease-in')),
      transition('resetCollapsed => collapsed', animate('0ms ease-in')),
      transition('resetCollapsed => expanded', animate('400ms ease-in')),
    ])
  ]
})

export class QuizListComponent implements OnInit {
  public contentHeight: number;
  public state: string;
  private currentWidth: number;
  constructor(
    private eventsHandler: SDKEventsHandlerService
  ) {
  }

  ngOnInit(): void {

    this.currentWidth = window.innerWidth;
    if (this.currentWidth > 768) {
      this.state = 'resetExpanded';
    } else {
      this.state = 'resetCollapsed'
    }

    this.eventsHandler.emitter$
    .pipe(
      filter((event) => event.type === SDKEventsHandlerEventType.WindowResize),
    )
    .subscribe(() => {
      this.state = window.innerWidth > 768 ? 'resetExpanded' : 'resetCollapsed';
      console.log(window.innerWidth);
    });
  }


  animateMe() {
    this.state = this.state !== 'expanded' ? 'expanded' : 'collapsed';
  }

}
