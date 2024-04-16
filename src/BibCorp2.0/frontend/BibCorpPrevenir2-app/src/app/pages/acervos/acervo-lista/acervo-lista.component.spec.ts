import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcervoListaComponent } from './acervo-lista.component';

describe('AcervoListaComponent', () => {
  let component: AcervoListaComponent;
  let fixture: ComponentFixture<AcervoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcervoListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcervoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
