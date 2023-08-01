import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRegiterComponent } from './owner-regiter.component';

describe('OwnerRegiterComponent', () => {
  let component: OwnerRegiterComponent;
  let fixture: ComponentFixture<OwnerRegiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerRegiterComponent]
    });
    fixture = TestBed.createComponent(OwnerRegiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
