import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'qz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  // private config = {
  //   baseUrl: environment.baseUrl
  // };

  constructor() {}

  ngOnInit(): void {}

}
