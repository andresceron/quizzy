import { TestBed, ComponentFixture } from '@angular/core/testing';
import { QuizBuilderQuestionComponent } from './quiz-builder-question.component';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuizBuilderQuestionComponent', () => {
  let component: QuizBuilderQuestionComponent;
  let fixture: ComponentFixture<QuizBuilderQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizBuilderQuestionComponent
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
    fixture = TestBed.createComponent(QuizBuilderQuestionComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create QuizBuilderQuestion component', () => {
    expect(component).toBeTruthy();
  });

});
