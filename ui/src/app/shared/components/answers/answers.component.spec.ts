import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AnswersComponent } from './answers.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

  xdescribe('AnswersComponent', () => {
  let component: AnswersComponent;
  let fixture: ComponentFixture<AnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnswersComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create answers component', () => {
    expect(component).toBeTruthy();
  });

});
