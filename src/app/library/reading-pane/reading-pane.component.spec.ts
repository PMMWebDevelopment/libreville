import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingPaneComponent } from './reading-pane.component';

describe('ReadingPaneComponent', () => {
  let component: ReadingPaneComponent;
  let fixture: ComponentFixture<ReadingPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
