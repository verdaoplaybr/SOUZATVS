import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Device {
  id: string;
  nome: string;
  deviceId: string;
  skin: string;
  status: string;
  canalAtual: string;
  vencimento: string;
}

export function DeviceTable() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch('/api/admin/clientes')
      .then(res => res.json())
      .then(setDevices);
  }, []);

  return (
    <div className="bg-[#1A1F2C] rounded-2xl border border-white/5 overflow-hidden shadow-lg">
      <div className="p-6 border-b border-white/5">
        <h3 className="text-white text-lg font-bold">Monitor de Dispositivos (Live Telemetria)</h3>
      </div>
      <table className="w-full text-left">
        <thead className="bg-[#1A1F2C]/50 text-white/60 text-sm">
          <tr>
            <th className="p-4">CLIENTE</th>
            <th className="p-4">DEVICE ID / MAC</th>
            <th className="p-4">SKIN ATIVA</th>
            <th className="p-4">STATUS</th>
            <th className="p-4">ASSISTINDO AGORA</th>
            <th className="p-4">VENCIMENTO</th>
            <th className="p-4">AÇÕES</th>
          </tr>
        </thead>
        <tbody className="text-white/80">
          {devices.map(device => (
            <tr key={device.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="p-4 font-bold">{device.nome}</td>
              <td className="p-4"><code className="bg-black/30 px-2 py-1 rounded text-xs">{device.deviceId}</code></td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  device.skin === 'palmeiras' ? 'bg-[#006437] text-white' : 
                  device.skin === 'corinthians' ? 'bg-white text-black' : 'bg-gray-600 text-white'
                }`}>
                  {device.skin === 'palmeiras' ? 'Verdão Play' : device.skin === 'corinthians' ? 'Timão Play' : device.skin}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  device.status === 'premium' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {device.status.toUpperCase()}
                </span>
              </td>
              <td className="p-4 text-cyan-400 font-medium">🎬 {device.canalAtual}</td>
              <td className="p-4 text-xs">{new Date(device.vencimento).toLocaleDateString()}</td>
              <td className="p-4">
                <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-bold transition">Genciar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
