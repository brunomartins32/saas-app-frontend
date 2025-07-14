import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;

  // Variáveis para os cards
  totalReceber: number = 0;
  totalPagar: number = 0;
  saldoPatrimonial: number = 0;
  valorTotal: number = 0;
  processando: boolean = false;

  // Injeção de serviços
  private dashboardService = inject(DashboardService);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.carregarDados();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  carregarDados() {
    this.dashboardService.obterResumo().subscribe({
      next: (resumo) => {
        this.totalReceber = resumo.totalContasReceber ?? 0;
        this.totalPagar = resumo.totalContasPagar ?? 0;
        this.saldoPatrimonial = resumo.totalContasPatrimoniais ?? 0;
        this.valorTotal =
          this.saldoPatrimonial + this.totalReceber - this.totalPagar;
        this.criarGrafico(
          this.totalReceber,
          this.totalPagar,
          this.saldoPatrimonial,
          this.valorTotal
        );
      },
      error: (err) => {
        this.mostrarMensagem('Erro ao carregar dados: ' + err.message, true);
      },
    });
  }

  efetivarContas() {
    this.processando = true;
    this.dashboardService.efetivarContas().subscribe({
      next: () => {
        this.mostrarMensagem('Contas efetivadas com sucesso!');
        this.carregarDados();
      },
      error: (err) => {
        this.mostrarMensagem('Erro ao efetivar contas: ' + err.message, true);
      },
      complete: () => (this.processando = false),
    });
  }

  private mostrarMensagem(mensagem: string, isErro: boolean = false) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      panelClass: isErro ? ['error-snackbar'] : ['success-snackbar'],
    });
  }

  criarGrafico(receber: number, pagar: number, saldo: number, total: number) {
    if (this.chart) this.chart.destroy();

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['A Receber', 'A Pagar', 'Saldo Patrimonial', 'Valor Total'],
        datasets: [
          {
            data: [receber, pagar, saldo, total],
            backgroundColor: [
              'rgba(75, 192, 192, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            barThickness: 'flex',
            maxBarThickness: 50,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                return `${context.label}: ${value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: (value) =>
                Number(value).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }),
            },
          },
        },
      },
    });
  }
}
