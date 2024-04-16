import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerNavigatorComponent } from './drawer-navigator.component';

describe('DrawerNavigatorComponent', () => {
  let component: DrawerNavigatorComponent;
  let fixture: ComponentFixture<DrawerNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawerNavigatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawerNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
