import { MetricCard } from './MetricCard';
import { TrafficChart } from './TrafficChart';
import { DeviceTable } from './DeviceTable';
import { Sidebar } from './Sidebar';
import { DistributionSection } from './DistributionSection';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E2E8F0] flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-white text-3xl font-bold mb-8">Painel Administrativo</h1>
        <div className="grid grid-cols-4 gap-6 mb-8">
          <MetricCard title="Premium" value="1,240" color="text-cyan-400" accentColor="border-cyan-400" />
          <MetricCard title="Testes" value="542" color="text-white" accentColor="border-white" />
          <MetricCard title="Renovações D-5" value="89" color="text-[#7C3AED]" accentColor="border-[#7C3AED]" />
          <MetricCard title="Bloqueados" value="12" color="text-red-400" accentColor="border-red-400" />
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8">
          <TrafficChart />
        </div>
        <DeviceTable />
        <DistributionSection />
      </div>
    </div>
  );
}
