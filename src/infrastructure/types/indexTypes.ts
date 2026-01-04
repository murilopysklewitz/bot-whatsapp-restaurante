export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    disponivel: boolean;
    criado_em: Date;
  }
  
  export interface ItemPedido {
    id: number;
    quantidade: number;
  }
  
  export interface Pedido {
    id: number;
    protocolo: string;
    telefone: string;
    itens: any;
    valor_total: number;
    status: string;
    endereco: string;
    criado_em: Date;
  }
  
  export interface Conversa {
    id: number;
    telefone: string;
    mensagem: string;
    resposta: string | null;
    tipo: string | null;
    criado_em: Date;
  }
  export interface ApiResponse<T = any> {
    sucesso: boolean;
    mensagem?: string;
    erro?: string;
    dados?: T;
  }