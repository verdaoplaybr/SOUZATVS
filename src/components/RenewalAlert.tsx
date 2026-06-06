import { Theme } from '../theme';

interface RenewalAlertProps {
  daysRemaining: number;
  onRenew: () => void;
  theme: Theme;
}

export function RenewalAlert({ daysRemaining, onRenew, theme }: RenewalAlertProps) {
  return (
    <div className={`fixed bottom-8 left-8 right-8 bg-destaque text-black p-6 rounded-2xl shadow-2xl flex items-center justify-between border-2 border-black/10 ${theme.themeClass}`}>
      <div className="flex items-center gap-4">
        <span className="text-3xl">⚠️</span>
        <p className="font-bold text-lg">
          ATENÇÃO: Sua assinatura expira em {daysRemaining} dias! Renove para não perder o próximo jogo.
        </p>
      </div>
      <button 
        onClick={onRenew}
        className="bg-main text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition"
      >
        RENOVAR AGORA
      </button>
    </div>
  );
}
