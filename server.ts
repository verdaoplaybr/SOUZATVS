import express from "express";
import path from "path";
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
  const PORT = 3000;

  app.use(express.json());

  // "Base de dados" (simulada para este exemplo, futuramente PostgreSQL)
  let tabelaClientes = [
      {
          id: "1",
          nome: "Cliente Palmeirense VIP",
          deviceId: "BOX_TESTE_VERDAO",
          status: "teste",
          skin: "palmeiras",
          canalAtual: "Nenhum",
          vencimento: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          usuarioPoliex: "TESTEGRATIS",
          senhaPoliex: "11949988411"
      },
      {
          id: "2",
          nome: "Cliente Corinthiano VIP",
          deviceId: "BOX_TESTE_TIMAO",
          status: "premium",
          skin: "corinthians",
          canalAtual: "Nenhum",
          vencimento: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          usuarioPoliex: "TESTEGRATIS",
          senhaPoliex: "11949988411"
      }
  ];

  // ENDPOINT: Handshake simples para validação do device
  app.get('/api/auth/handshake', (req, res) => {
    const { deviceId } = req.query;
    if (!deviceId) return res.status(400).send("DeviceId nao fornecido.");
    const cliente = tabelaClientes.find(c => c.deviceId === deviceId);
    if (!cliente) return res.status(404).send("Dispositivo nao cadastrado.");
    res.json({ success: true, nome: cliente.nome, status: cliente.status });
  });

  // ENDPOINT 1: A TV Box avisa o painel o que o cliente está assistindo (Telemetria)
  app.post('/api/telemetria/ping', (req, res) => {
      const { deviceId, canalAtual } = req.body;
      
      let cliente = tabelaClientes.find(c => c.deviceId === deviceId);
      if (cliente) {
          cliente.canalAtual = canalAtual; // Atualiza o canal na mesma hora no painel
          return res.json({ success: true, status: cliente.status, skin: cliente.skin });
      }
      
      res.status(404).json({ error: "Dispositivo não encontrado" });
  });

  // ENDPOINT 2: Retorna a lista de clientes atualizada para o painel de controle
  app.get('/api/admin/clientes', (req, res) => {
      res.json(tabelaClientes);
  });

  // ENDPOINT 3: Altera a Skin do time ou plano direto pelo Admin
  app.put('/api/admin/editar-cliente', (req, res) => {
      const { deviceId, novaSkin, novoStatus, novosDias } = req.body;
      let cliente = tabelaClientes.find(c => c.deviceId === deviceId);
      if (cliente) {
          if (novaSkin) cliente.skin = novaSkin;
          if (novoStatus) cliente.status = novoStatus;
          return res.json({ success: true, message: "Cliente atualizado!" });
      }
      res.status(404).json({ error: "Erro ao atualizar" });
  });

  app.get("/api/canais", (req, res) => {
    const emissora = req.query.emissora as string;
    if (emissora) {
      res.json(obterCanaisPorEmissora(todosOsCanais, emissora));
    } else {
      res.json(todosOsCanais);
    }
  });

  // Roteia o sinal para o player (Mascarador de Links)
  app.get('/stream/:idCanal', (req, res) => {
    const { idCanal } = req.params;
    const { deviceId } = req.query;

    if (!deviceId) {
        return res.status(400).send("DeviceId nao fornecido.");
    }

    // 1. Busca o cliente no nosso banco de dados pelo ID do aparelho
    const cliente = tabelaClientes.find(c => c.deviceId === deviceId);

    if (!cliente) {
        return res.status(404).send("Dispositivo nao cadastrado no painel.");
    }

    // 2. Verifica se o tempo de acesso expirou
    const agora = new Date();
    const dataVencimento = new Date(cliente.vencimento);

    if (agora > dataVencimento || cliente.status === "expirado") {
        cliente.status = "expirado";
        return res.status(403).send("Acesso Expirado.");
    }

    // 3. Monta a URL da Poliex de forma dinâmica usando as credenciais do ambiente
    const user = process.env.POLIEX_USER || cliente.usuarioPoliex;
    const pass = process.env.POLIEX_PASS || cliente.senhaPoliex;
    const urlFinalM3U8 = `https://poliex.org/api/v1/stream/${idCanal}.m3u8?user=${user}&pass=${pass}`;
    
    // Roteia o sinal diretamente para o player da TV Box
    res.redirect(urlFinalM3U8);
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
