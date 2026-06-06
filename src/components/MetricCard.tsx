export function MetricCard({ title, value, color, accentColor }: { title: string, value: string, color: string, accentColor: string }) {
  return (
    <div className={`bg-[#1A1F2C] p-6 rounded-2xl border-l-4 ${accentColor} shadow-lg`}>
      <h3 className="text-white/60 text-sm mb-2 uppercase">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
