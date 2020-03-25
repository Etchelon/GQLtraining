import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Route66Component } from './route66.component';

describe('Route66Component', () => {
  let component: Route66Component;
  let fixture: ComponentFixture<Route66Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Route66Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Route66Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
