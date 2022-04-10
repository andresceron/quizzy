import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

  xdescribe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create notification component', async(() => {
    expect(component).toBeTruthy();
  }));

});
