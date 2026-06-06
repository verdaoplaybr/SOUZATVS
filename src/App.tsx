/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { CanalIPTV, AccessStatus } from './types';
import { PreviewPlayer } from './components/PreviewPlayer';
import { PlanShowcase } from './components/PlanShowcase';
import { RenewalAlert } from './components/RenewalAlert';
import { themesMap } from './theme';
import { appConfig } from './config';

export default function App() {
  const [canais, setCanais] = useState<CanalIPTV[]>([]);
  const [selectedCanal, setSelectedCanal] = useState<CanalIPTV | null>(null);
  
  const [status, setStatus] = useState<AccessStatus>('premium');
  const [seconds, setSeconds] = useState(appConfig.tempo_teste_segundos);
  const [daysRemaining] = useState(appConfig.prazo_aviso_renovacao_dias);
  const [isRenewing, setIsRenewing] = useState(false);
  const [themeKey] = useState<string>('palmeiras');
  const [isAdmin, setIsAdmin] = useState(false);

  const theme = themesMap[themeKey];

  useEffect(() => {
    fetch('/api/canais')
      .then((res) => res.json())
      .then((data) => {
        setCanais(data);
        if (data.length > 0) setSelectedCanal(data[0]);
      });
  }, []);

  useEffect(() => {
    if (status !== 'teste') return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setStatus('expirado');
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (status === 'expirado' || isRenewing) {
    return <PlanShowcase theme={theme} />;
  }

  if (isAdmin) {
    return (
      <div className="relative">
        <AdminDashboard />
        <button 
          onClick={() => setIsAdmin(false)}
          className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg"
        >
          Voltar ao App
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 relative ${theme.themeClass}`}>
      <h1 className="text-4xl font-sans font-medium text-gray-900 tracking-tight mb-8 text-main">
        {theme.nomeApp}
      </h1>
      
      {status === 'teste' && (
        <div className="absolute top-8 left-8 bg-red-600/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-white font-bold shadow-lg">
          ⏳ TESTE GRÁTIS: {formatTime(seconds)}
        </div>
      )}

      {status === 'premium' && daysRemaining <= appConfig.prazo_aviso_renovacao_dias && (
        <RenewalAlert daysRemaining={daysRemaining} onRenew={() => setIsRenewing(true)} theme={theme} />
      )}

      <div className="w-full max-w-5xl flex gap-8">
        <div className="w-1/3">
          {selectedCanal && <PreviewPlayer streamUrl={selectedCanal.streamUrl} />}
        </div>
        
        <div className="w-2/3 grid grid-cols-1 gap-4">
          {canais.map((canal, index) => (
            <button
              key={index}
              onClick={() => setSelectedCanal(canal)}
              className={`text-left w-full bg-white p-6 rounded-xl shadow-sm border ${selectedCanal === canal ? 'border-destaque' : 'border-gray-100'} hover:border-gray-300 transition-colors`}
            >
              <h2 className={`text-xl font-bold ${selectedCanal === canal ? 'text-destaque' : 'text-gray-900'}`}>{canal.nomeExibicao}</h2>
              <p className="text-gray-600">{canal.emissoraMae} - {canal.estado}</p>
            </button>
          ))}
        </div>
      </div>
      
      <button 
          onClick={() => setIsAdmin(true)}
          className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg text-xs"
        >
          Admin
        </button>
    </div>
  );
}

