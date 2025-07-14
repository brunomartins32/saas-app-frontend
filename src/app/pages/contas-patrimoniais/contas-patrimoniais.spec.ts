import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasPatrimoniais } from './contas-patrimoniais';

describe('ContasPatrimoniais', () => {
  let component: ContasPatrimoniais;
  let fixture: ComponentFixture<ContasPatrimoniais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContasPatrimoniais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContasPatrimoniais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
