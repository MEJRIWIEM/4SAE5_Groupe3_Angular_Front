import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComComponent } from './date-com.component';

describe('DateComComponent', () => {
  let component: DateComComponent;
  let fixture: ComponentFixture<DateComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateComComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
