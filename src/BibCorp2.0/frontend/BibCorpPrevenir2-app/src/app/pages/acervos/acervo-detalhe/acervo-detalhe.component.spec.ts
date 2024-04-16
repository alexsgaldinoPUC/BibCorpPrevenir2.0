import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcervoDetalheComponent } from './acervo-detalhe.component';

describe('AcervoDetalheComponent', () => {
  let component: AcervoDetalheComponent;
  let fixture: ComponentFixture<AcervoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcervoDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcervoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
