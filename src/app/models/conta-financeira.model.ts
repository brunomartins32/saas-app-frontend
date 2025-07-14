export interface ContaFinanceira {
  id?: number | null;
  descricao: string;
  valor: number;
  tipo: 'A_PAGAR' | 'A_RECEBER';
  dataVencimento?: string | null;
  dataEfetivacao?: string | null;
  quitada?: boolean;
  efetivada?: boolean;
  // Adicione outros campos conforme necessário
}

// Se precisar de um tipo para o formulário específico
export interface ContaFinanceiraForm {
  id?: number | null;
  descricao: string;
  valor: number;
  tipo: 'A_PAGAR' | 'A_RECEBER';
  dataVencimento?: string | null;
}
