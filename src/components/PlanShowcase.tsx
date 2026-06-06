import { Theme } from '../theme';
import { appConfig } from '../config';

interface Props {
  theme: Theme;
}

export function PlanShowcase({ theme }: Props) {
  const plans = Object.entries(appConfig.planos_venda);

  return (
    <div className={`min-h-screen p-12 flex flex-col items-center justify-center text-white ${theme.themeClass} bg-main`}>
      <h1 className="text-4xl font-bold text-destaque mb-4">🚫 {appConfig.mensagem_bloqueio}</h1>
      <p className="text-white/70 text-xl mb-12">Escolha um plano abaixo para liberar o sinal do {theme.nomeApp} imediatamente:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {plans.map(([key, plano], index) => {
          const isHighlighted = key === 'trimestral';
          return (
            <div
              key={plano.nome}
              className={`p-8 rounded-3xl border ${isHighlighted ? 'border-destaque bg-main' : 'border-destaque/50 bg-main/50'} flex flex-col items-center`}
            >
              <h2 className="text-2xl font-bold mb-2">{plano.nome}</h2>
              <p className="text-white/70 mb-6">{plano.descricao}</p>
              <span className="text-4xl font-bold text-destaque mb-8">{plano.preco}</span>
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:opacity-90 transition">
                CONTRATAR
              </button>
            </div>
          );
        })}
      </div>
      <p className="mt-12 text-white/50 italic">⏳ Após o pagamento, nosso suporte ativará seu acesso em até 4 horas (geralmente em minutos).</p>
    </div>
  );
}
