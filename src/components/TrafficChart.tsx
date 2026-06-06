import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '10h', trafego: 4000 },
  { name: '12h', trafego: 3000 },
  { name: '14h', trafego: 2000 },
  { name: '16h', trafego: 2780 },
  { name: '18h', trafego: 1890 },
  { name: '20h', trafego: 2390 },
];

export function TrafficChart() {
  return (
    <div className="bg-[#1A1F2C] p-6 rounded-2xl border border-white/5 h-[300px] shadow-lg">
      <h3 className="text-white font-bold mb-4">Monitoramento de Tráfego</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#666" fontSize={12} />
          <YAxis stroke="#666" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0B0E14', borderColor: '#7C3AED', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line type="monotone" dataKey="trafego" stroke="#7C3AED" strokeWidth={3} dot={{ stroke: '#7C3AED', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
