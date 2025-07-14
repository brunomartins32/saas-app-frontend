
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conta-patrimonial-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conta-patrimonial-form.component.html',
  styleUrls: ['./conta-patrimonial-form.component.scss']
})
export class ContaPatrimonialFormComponent {
  @Input() conta: any = { nome: '', instituicao: '', saldoAtual: 0, tipo: 'CONTA_CORRENTE' };
  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  submit() {
    this.salvar.emit(this.conta);
  }
}
