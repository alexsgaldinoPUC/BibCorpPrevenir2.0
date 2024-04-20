import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioListaComponent } from './patrimonio-lista.component';

describe('PatrimonioListaComponent', () => {
  let component: PatrimonioListaComponent;
  let fixture: ComponentFixture<PatrimonioListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatrimonioListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatrimonioListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
