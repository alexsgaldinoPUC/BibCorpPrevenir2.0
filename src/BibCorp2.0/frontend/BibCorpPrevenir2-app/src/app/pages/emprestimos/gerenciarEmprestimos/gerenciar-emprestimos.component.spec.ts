import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GerenciarEmprestimosComponent } from "./gerenciar-emprestimos.component";

describe("GerenciarEmprestimosComponent", () => {
  let component: GerenciarEmprestimosComponent;
  let fixture: ComponentFixture<GerenciarEmprestimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerenciarEmprestimosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarEmprestimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
