import { SkinConfig } from './types';

export interface Theme {
  nomeApp: string;
  themeClass: string;
  skin: SkinConfig;
}

export const themesMap: Record<string, Theme> = {
  palmeiras: {
    nomeApp: "VERDÃO PLAY",
    themeClass: "theme-palmeiras",
    skin: {
      nome_comercial: "VERDÃO PLAY",
      cor_primaria_hex: "#006437",
      cor_destaque_hex: "#C8AA2D",
      cor_fundo_hex: "#0A1A0F",
    }
  },
  corinthians: {
    nomeApp: "TIMÃO PLAY",
    themeClass: "theme-corinthians",
    skin: {
      nome_comercial: "TIMÃO PLAY",
      cor_primaria_hex: "#111111",
      cor_destaque_hex: "#FFFFFF",
      cor_fundo_hex: "#050505",
    }
  },
};
