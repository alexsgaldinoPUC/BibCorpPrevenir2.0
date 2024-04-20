import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioDetalheComponent } from './patrimonio-detalhe.component';

describe('PatrimonioDetalheComponent', () => {
  let component: PatrimonioDetalheComponent;
  let fixture: ComponentFixture<PatrimonioDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatrimonioDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatrimonioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
