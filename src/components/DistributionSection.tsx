export function DistributionSection() {
  const gerarLinkTesteWeb = () => {
    const idAleatorio = "WEB_" + Math.floor(100000 + Math.random() * 900000);
    const linkFinal = `https://souzastvs.github.io/arena/teste.html?deviceId=${idAleatorio}`;
    navigator.clipboard.writeText(linkFinal);
    alert("Link de Teste Web gerado e copiado! É só colar no WhatsApp do cliente:\n\n" + linkFinal);
  };

  return (
    <div className="bg-[#1A1F2C] p-8 rounded-2xl border border-white/5 shadow-lg mt-8">
      <h2 className="text-white text-xl font-bold mb-6">🚀 Central de Distribuição do Aplicativo</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#22293A] border border-[#2A3142] rounded-xl p-6 text-center">
          <h3 className="text-white font-bold mb-2">Disparar via WhatsApp</h3>
          <p className="text-gray-400 text-sm mb-4">Envie o convite com link do APK.</p>
          <input type="text" placeholder="11999999999" className="w-full bg-[#0B0E14] border border-[#2A3142] p-2 rounded text-white mb-3" />
          <button className="w-full bg-[#25D366] hover:bg-[#1EA952] text-white font-bold py-2 rounded transition">Enviar via Zap</button>
        </div>
        <div className="bg-[#22293A] border border-[#2A3142] rounded-xl p-6 text-center">
          <h3 className="text-white font-bold mb-2">Link de Download</h3>
          <p className="text-gray-400 text-sm mb-4">Copie o link direto do APK.</p>
          <input type="text" readOnly value="https://bit.ly/arena-apk" className="w-full bg-[#0B0E14] border border-[#2A3142] p-2 rounded text-gray-300 mb-3" />
          <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-2 rounded transition">Copiar Link</button>
        </div>
        <div className="bg-[#22293A] border border-[#2A3142] rounded-xl p-6 text-center">
          <h3 className="text-white font-bold mb-2">Ativar Nova Box</h3>
          <p className="text-gray-400 text-sm mb-4">Insira cliente e force sua skin.</p>
          <input type="text" placeholder="Nome" className="w-full bg-[#0B0E14] border border-[#2A3142] p-2 rounded text-white mb-2" />
          <select className="w-full bg-[#0B0E14] border border-[#2A3142] p-2 rounded text-white mb-3">
             <option>Verdão Play</option>
             <option>Timão Play</option>
          </select>
          <button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-2 rounded transition">Cadastrar</button>
        </div>
        <div className="bg-[#22293A] border border-dashed border-[#38BDF8] rounded-xl p-6 text-center">
          <h3 className="text-white font-bold mb-2">🔗 Link de Teste Web</h3>
          <p className="text-gray-400 text-sm mb-4">Teste direto no navegador.</p>
          <button onClick={gerarLinkTesteWeb} className="w-full bg-[#38BDF8] hover:bg-[#0ea5e9] text-black font-bold py-2 rounded transition">
            Gerar Link
          </button>
        </div>
      </div>
    </div>
  );
}
