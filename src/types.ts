export interface CanalIPTV {
  nomeExibicao: string;
  emissoraMae: string;
  estado: string;
  streamUrl: string;
}

export type AccessStatus = 'teste' | 'premium' | 'expirado';

export interface PlanConfig {
  nome: string;
  preco: string;
  descricao: string;
  chave_pix: string;
}

export interface SkinConfig {
  nome_comercial: string;
  cor_primaria_hex: string;
  cor_destaque_hex: string;
  cor_fundo_hex: string;
}

export interface AppConfig {
  tempo_teste_segundos: number;
  mensagem_bloqueio: string;
  prazo_aviso_renovacao_dias: number;
  planos_venda: Record<string, PlanConfig>;
  times_skins: Record<string, SkinConfig>;
}
