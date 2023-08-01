import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersComponent } from './theaters.component';

describe('TheatersComponent', () => {
  let component: TheatersComponent;
  let fixture: ComponentFixture<TheatersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheatersComponent]
    });
    fixture = TestBed.createComponent(TheatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
