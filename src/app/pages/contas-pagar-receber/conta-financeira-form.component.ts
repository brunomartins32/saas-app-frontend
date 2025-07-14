import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
export interface ContaFinanceiraForm {
  id?: number | null;
  descricao: string;
  valor: number;
  tipo: 'A_PAGAR' | 'A_RECEBER';
  dataVencimento?: string | null;
  quitada?: boolean;
  efetivada?: boolean;
}

@Component({
  selector: 'app-contas-financeiras-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './conta-financeira-form.component.html',
  styleUrls: ['./conta-financeira-form.component.scss'],
})
export class ContasFinanceirasFormComponent {
[x: string]: any;
  @Input() conta: ContaFinanceiraForm = {
    descricao: '',
    valor: 0,
    tipo: 'A_PAGAR',
    dataVencimento: null,
  };

  @Output() salvar = new EventEmitter<ContaFinanceiraForm>();
  @Output() cancelar = new EventEmitter<void>();

  tipos = [
    { value: 'A_PAGAR', label: 'A Pagar' },
    { value: 'A_RECEBER', label: 'A Receber' },
  ];

  onSubmit() {
    this.salvar.emit(this.conta);
  }

  onCancel() {
    this.cancelar.emit();
  }
}
