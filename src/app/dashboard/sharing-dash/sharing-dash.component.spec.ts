import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingDashComponent } from './sharing-dash.component';

describe('SharingDashComponent', () => {
  let component: SharingDashComponent;
  let fixture: ComponentFixture<SharingDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
