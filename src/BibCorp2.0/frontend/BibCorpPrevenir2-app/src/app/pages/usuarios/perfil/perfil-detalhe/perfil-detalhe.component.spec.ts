import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDetalheComponent } from './perfil-detalhe.component';

describe('PerfilDetalheComponent', () => {
  let component: PerfilDetalheComponent;
  let fixture: ComponentFixture<PerfilDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
