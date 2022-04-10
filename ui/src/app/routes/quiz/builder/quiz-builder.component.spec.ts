import { TestBed, ComponentFixture } from '@angular/core/testing';
import { QuizBuilderComponent } from './quiz-builder.component';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuizBuilderComponent', () => {
  let component: QuizBuilderComponent;
  let fixture: ComponentFixture<QuizBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizBuilderComponent
      ],
      imports: [
        SharedModule,
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
    fixture = TestBed.createComponent(QuizBuilderComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create QuizBuilder component', () => {
    expect(component).toBeTruthy();
  });

});
