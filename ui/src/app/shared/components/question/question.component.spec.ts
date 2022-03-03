import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { QuestionComponent } from './question.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

  xdescribe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create sortby component', async(() => {
    expect(component).toBeTruthy();
  }));

});
