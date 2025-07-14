import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = 'http://localhost:8611/api/dashboard';
  private contasUrl = 'http://localhost:8611/api/contas-financeiras';
  atualizacao$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Métodos existentes
  obterResumo(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  notificarAtualizacao() {
    this.atualizacao$.next();
  }

  // Novo método para efetivação
  efetivarContas(): Observable<void> {
    return this.http.post<void>(`${this.contasUrl}/efetivar`, {});
  }

  // Método opcional para obter contas pendentes
  obterContasPendentes(): Observable<number> {
    return this.http.get<number>(`${this.contasUrl}/pendentes`);
  }
}
