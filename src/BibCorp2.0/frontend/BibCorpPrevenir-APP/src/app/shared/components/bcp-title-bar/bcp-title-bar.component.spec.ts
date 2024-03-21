import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcpTitleBarComponent } from './bcp-title-bar.component';

describe('BcpTitleBarComponent', () => {
  let component: BcpTitleBarComponent;
  let fixture: ComponentFixture<BcpTitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcpTitleBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BcpTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
