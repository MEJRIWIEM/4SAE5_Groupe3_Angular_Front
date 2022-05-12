import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvertisingComponent } from './edit-advertising.component';

describe('EditAdvertisingComponent', () => {
  let component: EditAdvertisingComponent;
  let fixture: ComponentFixture<EditAdvertisingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdvertisingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdvertisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
