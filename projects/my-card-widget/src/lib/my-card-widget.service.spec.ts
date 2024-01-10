import { TestBed } from '@angular/core/testing';

import { MyCardWidgetService } from './my-card-widget.service';

describe('MyCardWidgetService', () => {
  let service: MyCardWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCardWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
