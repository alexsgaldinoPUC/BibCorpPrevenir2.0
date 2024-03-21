import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcpHomePageComponent } from './bcp-home-page.component';

describe('BcpHomePageComponent', () => {
  let component: BcpHomePageComponent;
  let fixture: ComponentFixture<BcpHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcpHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BcpHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
