import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AnalyticsItemComponent } from './analytics-item.component';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('AnalyticsItemComponent', () => {
  let component: AnalyticsItemComponent;
  let fixture: ComponentFixture<AnalyticsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnalyticsItemComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsItemComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create analytics-item component', () => {
    expect(component).toBeTruthy();
  });

});
