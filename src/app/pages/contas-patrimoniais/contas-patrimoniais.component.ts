
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasPatrimoniaisService } from '../../services/contas-patrimoniais.service';
import { ContaPatrimonialFormComponent } from './conta-patrimonial-form.component';

@Component({
  selector: 'app-contas-patrimoniais',
  standalone: true,
  imports: [CommonModule, ContaPatrimonialFormComponent],
  templateUrl: './contas-patrimoniais.component.html',
  styleUrls: ['./contas-patrimoniais.component.scss']
})
export class ContasPatrimoniaisComponent implements OnInit {
  contas: any[] = [];
  editando = false;
  contaSelecionada: any = null;

  constructor(private service: ContasPatrimoniaisService) {}

  ngOnInit() {
    this.carregarContas();
  }

  carregarContas() {
    this.service.listar().subscribe(data => this.contas = data);
  }

  novaConta() {
    this.contaSelecionada = {
      nome: '',
      instituicao: '',
      saldoAtual: 0,
      tipo: 'CONTA_CORRENTE'
    };
    this.editando = true;
  }

  editar(conta: any) {
    this.contaSelecionada = { ...conta };
    this.editando = true;
  }

  salvarConta(conta: any) {
    if (!conta) return;

    if (conta.id) {
      this.service.atualizar(conta).subscribe(() => this.carregarContas());
    } else {
      this.service.criar(conta).subscribe(() => this.carregarContas());
    }

    this.cancelarEdicao();
  }

  deletar(id: number) {
    this.service.excluir(id).subscribe(() => this.carregarContas());
  }

  cancelarEdicao() {
    this.editando = false;
    this.contaSelecionada = null;
  }
}
