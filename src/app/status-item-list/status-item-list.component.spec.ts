import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusItemListComponent } from './status-item-list.component';

describe('StatusItemListComponent', () => {
  let component: StatusItemListComponent;
  let fixture: ComponentFixture<StatusItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
