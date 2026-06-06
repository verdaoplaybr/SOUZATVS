export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#1A1F2C] border-r border-[#2A3142] fixed flex flex-col p-5">
      <div className="text-white font-bold text-xl text-center mb-10 tracking-widest border-b border-[#2A3142] pb-5">
        ARENA ADMIN
      </div>
      <nav className="flex flex-col gap-2">
        <a href="#" className="text-white bg-[#7C3AED]/10 border-l-4 border-[#7C3AED] p-3 rounded flex items-center gap-3">
          📊 Dashboard
        </a>
        <a href="#" className="text-gray-400 hover:text-white hover:bg-white/5 p-3 rounded flex items-center gap-3">
          👥 Clientes
        </a>
        <a href="#" className="text-gray-400 hover:text-white hover:bg-white/5 p-3 rounded flex items-center gap-3">
          🚀 APKs
        </a>
      </nav>
    </div>
  );
}
