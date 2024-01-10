import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCardWidgetComponent } from './my-card-widget.component';

describe('MyCardWidgetComponent', () => {
  let component: MyCardWidgetComponent;
  let fixture: ComponentFixture<MyCardWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCardWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
