import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class ContasFinanceirasService {
  private api = 'http://localhost:8611/api/contas-financeiras';

  constructor(private http: HttpClient) {}




  listar() {
    return this.http.get<any[]>(this.api);
  }
  efetivarConta(id: number): Observable<any> {
    return this.http.post(`${this.api}/efetivar/${id}`, {});
  }
  criar(conta: any) {
    return this.http.post<any>(this.api, conta);
  }

  atualizar(conta: any) {
    return this.http.put<any>(`${this.api}/${conta.id}`, conta);
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  efetivarContasQuitadas(): Observable<void> {
    return this.http.post<void>(`${this.api}/efetivar`, {});
  }

  quitarConta(id: number): Observable<any> {
    return this.http.patch(`${this.api}/${id}/quitar`, {});
  }


}
