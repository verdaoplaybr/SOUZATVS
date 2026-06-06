import { AppConfig } from './types';

export const appConfig: AppConfig = {
  tempo_teste_segundos: 14400,
  mensagem_bloqueio: "Seu tempo de jogo grátis terminou! Escolha um plano abaixo para liberar o sinal imediatamente.",
  prazo_aviso_renovacao_dias: 5,
  planos_venda: {
    mensal: {
      nome: "PLANO MENSAL",
      preco: "R$ 35,00",
      descricao: "Acesso Completo | Grade Nacional",
      chave_pix: "seu-email-ou-celular-pix@teste.com"
    },
    trimestral: {
      nome: "PLANO TRIMESTRAL",
      preco: "R$ 85,00",
      descricao: "Melhor Opção | Desconto Promocional",
      chave_pix: "seu-email-ou-celular-pix@teste.com"
    },
    anual: {
      nome: "PLANO ANUAL",
      preco: "R$ 250,00",
      descricao: "Acesso VIP | O Ano Inteiro de Jogos",
      chave_pix: "seu-email-ou-celular-pix@teste.com"
    }
  },
  times_skins: {
    palmeiras: {
      nome_comercial: "VERDÃO PLAY",
      cor_primaria_hex: "#006437",
      cor_destaque_hex: "#C8AA2D",
      cor_fundo_hex: "#0A1A0F",
    },
    corinthians: {
      nome_comercial: "TIMÃO PLAY",
      cor_primaria_hex: "#111111",
      cor_destaque_hex: "#FFFFFF",
      cor_fundo_hex: "#050505",
    }
  }
};
