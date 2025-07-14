import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasFinanceirasService } from '../../services/contas-financeiras.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContasFinanceirasFormComponent } from './conta-financeira-form.component';
import { ContaFinanceira } from '../../models/conta-financeira.model';

@Component({
  selector: 'app-contas-pagar-receber',
  standalone: true,
  imports: [
    CommonModule,
    ContasFinanceirasFormComponent,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './contas-pagar-receber.component.html',
  styleUrls: ['./contas-pagar-receber.component.scss'],
})
export class ContasPagarReceberComponent implements OnInit {
  contas: ContaFinanceira[] = [];
  contasAtivas: ContaFinanceira[] = [];
  contasEfetivadas: ContaFinanceira[] = [];
  editando = false;
  contaSelecionada: ContaFinanceira | null = null;
  carregando = false;
  colunasExibidas = ['descricao', 'valor', 'dataVencimento', 'status', 'acoes'];
  contaEmProcessamento: number | null = null;

  constructor(
    private service: ContasFinanceirasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarContas();
  }

  carregarContas() {
    this.carregando = true;
    this.service.listar().subscribe({
      next: (contas) => {
        this.contas = contas;
        this.filtrarContas();
        this.carregando = false;
      },
      error: (err) => {
        this.mostrarErro('Erro ao carregar contas: ' + err.message);
        this.carregando = false;
      },
    });
  }
  getContaVazia(): ContaFinanceira {
    return {
      id: null,
      descricao: '',
      valor: 0,
      tipo: 'A_PAGAR',
      dataVencimento: null,
      quitada: false,
      efetivada: false,
    };
  }
  filtrarContas() {
    this.contasAtivas = this.contas.filter((conta) => !conta.efetivada);
    this.contasEfetivadas = this.contas.filter((conta) => conta.efetivada);
  }

  novaConta() {
    this.contaSelecionada = {
      id: null,
      descricao: '',
      valor: 0,
      tipo: 'A_PAGAR',
      dataVencimento: null,
      quitada: false,
      efetivada: false,
    };
    this.editando = true;
  }

  editarConta(conta: ContaFinanceira) {
    this.contaSelecionada = { ...conta };
    this.editando = true;
  }

  salvarConta(conta: ContaFinanceira) {
    this.contaEmProcessamento = conta.id || 0;

    const operacao = conta.id
      ? this.service.atualizar(conta)
      : this.service.criar(conta);

    operacao.subscribe({
      next: () => {
        this.carregarContas();
        this.editando = false;
        this.mostrarSucesso('Conta salva com sucesso!');
      },
      error: (err) => {
        this.mostrarErro('Erro ao salvar conta: ' + err.message);
        this.contaEmProcessamento = null;
      },
    });
  }
  quitarConta(conta: ContaFinanceira) {
    if (conta.quitada) {
      this.mostrarErro('Esta conta já está quitada');
      return;
    }

    if (!conta.id) {
      this.mostrarErro('Conta sem ID válido');
      return;
    }

    this.contaEmProcessamento = conta.id;

    this.service.quitarConta(conta.id).subscribe({
      next: () => {
        conta.quitada = true;
        this.mostrarSucesso('Conta quitada com sucesso!');
      },
      error: (err) => {
        this.mostrarErro(err.error?.message || 'Erro ao quitar conta');
        this.contaEmProcessamento = null;
      },
    });
  }

efetivarConta(conta: ContaFinanceira) {
  if (!conta.quitada) {
    this.mostrarErro('A conta precisa estar quitada para efetivar');
    return;
  }

  if (conta.efetivada) {
    this.mostrarErro('Esta conta já foi efetivada');
    return;
  }

  if (!conta.id) {
    this.mostrarErro('Conta sem ID válido para efetivação');
    return;
  }

  this.contaEmProcessamento = conta.id;

  this.service.efetivarConta(conta.id).subscribe({
    next: () => {
      // Adicione esta linha para definir a data atual
      conta.dataEfetivacao = new Date().toISOString();
      conta.efetivada = true;
      this.filtrarContas();
      this.mostrarSucesso('Conta efetivada com sucesso!');
    },
    error: (err) => {
      this.mostrarErro(err.error?.message || 'Erro ao efetivar conta');
      this.contaEmProcessamento = null;
    }
  });
}
  cancelarEdicao() {
    this.editando = false;
    this.contaSelecionada = null;
  }

  private mostrarSucesso(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', { duration: 3000 });
  }

  private mostrarErro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', { duration: 5000 });
  }
}
