import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TimerComponent } from './timer.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

  xdescribe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimerComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create Timer component', () => {
    expect(component).toBeTruthy();
  });

});
