import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleNavigatorComponent } from './title-navigator.component';

describe('TitleNavigatorComponent', () => {
  let component: TitleNavigatorComponent;
  let fixture: ComponentFixture<TitleNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleNavigatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
