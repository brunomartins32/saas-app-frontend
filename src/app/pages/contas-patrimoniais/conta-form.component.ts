
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conta-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.scss']
})
export class ContaFormComponent {
  @Input() conta: any = { nome: '', valor: 0 };
  @Output() salvar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  submit() {
    this.salvar.emit(this.conta);
  }
}
