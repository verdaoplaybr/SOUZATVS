import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { CanalIPTV } from "./src/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// "Base de dados" (simulada para este exemplo)
const todosOsCanais: CanalIPTV[] = [
  { nomeExibicao: "SBT SP", emissoraMae: "SBT", estado: "SP", streamUrl: "https://example.com/sbt-sp.m3u8" },
  { nomeExibicao: "SBT RJ", emissoraMae: "SBT", estado: "RJ", streamUrl: "https://example.com/sbt-rj.m3u8" },
  { nomeExibicao: "Globo SP", emissoraMae: "Globo", estado: "SP", streamUrl: "https://example.com/globo-sp.m3u8" },
];

function obterCanaisPorEmissora(anais: CanalIPTV[], emissoraSelecionada: string): CanalIPTV[] {
  return anais.filter((canal) => canal.emissoraMae.toUpperCase() === emissoraSelecionada.toUpperCase());
}

async function startServer() {
  const app = express();
  
  app.use(cors());
  app.use(express.json());

  // Banco de dados em memória
  let baseClientes = [
    { id: "1", nome: "Marcos Palmeirense", deviceId: "BOX_TESTE_VERDAO", status: "teste", skin: "palmeiras", canalAtual: "Nenhum", vencimento: new Date(Date.now() + 4*60*60*1000).toISOString(), usuarioPoliex: "TESTEGRATIS", senhaPoliex: "11949988411" },
    { id: "2", nome: "Thiago Alvinegro", deviceId: "BOX_TESTE_TIMAO", status: "premium", skin: "corinthians", canalAtual: "Nenhum", vencimento: new Date(Date.now() + 5*24*60*60*1000).toISOString(), usuarioPoliex: "TESTEGRATIS", senhaPoliex: "11949988411" }
  ];

  // 1. ROTA DE TELEMETRIA: A TV avisa o painel o que o cliente está a ver
  app.post('/api/telemetria/ping', (req, res) => {
    const { deviceId, canalAtual } = req.body;
    let cliente = baseClientes.find(c => c.deviceId === deviceId);
    if (cliente) {
        cliente.canalAtual = canalAtual;
        return res.json({ success: true, skin: cliente.skin, status: cliente.status });
    }
    res.status(404).json({ success: false, message: "Aparelho não cadastrado" });
  });

  // 2. ROTA ADMIN: API que alimenta a Tabela
  app.get('/api/admin/clientes', (req, res) => {
      res.json(baseClientes);
  });

  // 3. ROTA ADMIN: Cadastrar ou Modificar Skin/Plano remotamente
  app.post('/api/admin/cadastrar', (req, res) => {
    const { nome, deviceId, skin } = req.body;
    const novoCliente = {
        id: String(baseClientes.length + 1),
        nome: nome || "Novo Cliente Box",
        deviceId: deviceId,
        status: "teste",
        skin: skin || "palmeiras",
        canalAtual: "Nenhum",
        vencimento: new Date(Date.now() + 4*60*60*1000).toISOString(),
        usuarioPoliex: "TESTEGRATIS",
        senhaPoliex: "11949988411"
    };
    baseClientes.push(novoCliente);
    res.json({ success: true, message: "Dispositivo ativado remotamente!" });
  });

  // 4. ROTA DE STREAMING "ZERO HACKER" (MASCARADA)
  app.get('/stream/:idCanal', (req, res) => {
    const { idCanal } = req.params;
    const { deviceId } = req.query;

    const cliente = baseClientes.find(c => c.deviceId === deviceId);
    if (!cliente || cliente.status === "expirado") {
        return res.status(403).send("Acesso Expirado. Efetue o pagamento via PIX.");
    }

    // Monta a URL da Poliex de forma dinâmica usando as credenciais do ambiente
    const user = process.env.POLIEX_USER || cliente.usuarioPoliex;
    const pass = process.env.POLIEX_PASS || cliente.senhaPoliex;
    const urlFinalM3U8 = `https://poliex.org/api/v1/stream/${idCanal}.m3u8?user=${user}&pass=${pass}`;
    
    // Roteia o sinal diretamente para o player da TV Box
    res.redirect(urlFinalM3U8);
  });

  // (rest of the endpoints)
  app.get("/api/canais", (req, res) => {
    const emissora = req.query.emissora as string;
    if (emissora) {
      res.json(obterCanaisPorEmissora(todosOsCanais, emissora));
    } else {
      res.json(todosOsCanais);
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
