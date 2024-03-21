import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcpNavBarComponent } from './bcp-nav-bar.component';

describe('BcpNavBarComponent', () => {
  let component: BcpNavBarComponent;
  let fixture: ComponentFixture<BcpNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcpNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BcpNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
