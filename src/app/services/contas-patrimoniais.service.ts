
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContasPatrimoniaisService {
  private api = 'http://localhost:8611/api/patrimonios';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.api);
  }

  criar(conta: any) {
    return this.http.post<any>(this.api, conta);
  }

  atualizar(conta: any) {
    return this.http.put<any>(`\${this.api}/\${conta.id}`, conta);
  }

  excluir(id: number) {
    return this.http.delete(`\${this.api}/\${id}`);
  }
}
