import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesDashComponent } from './files-dash.component';

describe('FilesDashComponent', () => {
  let component: FilesDashComponent;
  let fixture: ComponentFixture<FilesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
