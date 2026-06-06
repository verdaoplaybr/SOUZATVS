export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#1A1F2C] border-r border-[#2A3142] fixed flex flex-col p-5">
      <div className="text-white font-bold text-2xl text-center mb-10 tracking-widest border-b border-[#2A3142] pb-5 pt-5">
        SOUZASTVS
      </div>
      <nav className="flex flex-col gap-2">
        <a href="#" className="text-white bg-[#7C3AED]/10 border-l-4 border-[#7C3AED] p-3 rounded flex items-center gap-3">
          📊 Dashboard Central
        </a>
      </nav>
    </div>
  );
}
