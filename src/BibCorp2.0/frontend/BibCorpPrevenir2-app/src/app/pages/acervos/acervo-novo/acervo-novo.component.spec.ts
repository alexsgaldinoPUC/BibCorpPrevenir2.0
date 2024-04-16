import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcervoNovoComponent } from './acervo-novo.component';

describe('AcervoNovoComponent', () => {
  let component: AcervoNovoComponent;
  let fixture: ComponentFixture<AcervoNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcervoNovoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcervoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
