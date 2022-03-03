import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ResultComponent } from './result.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

  xdescribe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create result component', async(() => {
    expect(component).toBeTruthy();
  }));

});
