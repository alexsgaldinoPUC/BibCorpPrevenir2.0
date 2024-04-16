/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmprestimoService } from './emprestimo.service';

describe('Service: Emprestimo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmprestimoService]
    });
  });

  it('should ...', inject([EmprestimoService], (service: EmprestimoService) => {
    expect(service).toBeTruthy();
  }));
});
