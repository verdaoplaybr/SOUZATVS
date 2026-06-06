import { MetricCard } from './MetricCard';
import { TrafficChart } from './TrafficChart';
import { DeviceTable } from './DeviceTable';
import { Sidebar } from './Sidebar';
import { DistributionSection } from './DistributionSection';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E2E8F0] flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-10 bg-[#0B0E14]">
        <h1 className="text-white text-3xl font-bold mb-2">Torre de Comando</h1>
        <p className="text-[#94A3B8] mb-8">Gerenciamento de Clientes e Testes Web</p>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <MetricCard title="Clientes Ativos" value="2" color="text-white" accentColor="border-[#7C3AED]" />
          <MetricCard title="Testes Web Hoje" value="0" color="text-[#38BDF8]" accentColor="border-[#38BDF8]" />
        </div>
        <DistributionSection />
      </div>
    </div>
  );
}
