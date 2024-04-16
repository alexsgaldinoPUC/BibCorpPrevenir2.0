import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcervoEditarComponent } from './acervo-editar.component';

describe('AcervoEditarComponent', () => {
  let component: AcervoEditarComponent;
  let fixture: ComponentFixture<AcervoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcervoEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcervoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
