import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDashComponent } from './delete-dash.component';

describe('DeleteDashComponent', () => {
  let component: DeleteDashComponent;
  let fixture: ComponentFixture<DeleteDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
