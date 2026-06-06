CREATE TABLE clientes_verdao_timao (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(100) UNIQUE NOT NULL, -- Identificador único da TV Box
    nome_cliente VARCHAR(100),
    status_acesso VARCHAR(20) DEFAULT 'teste', -- 'teste', 'premium', 'expirado'
    skin_time VARCHAR(30) DEFAULT 'palmeiras', -- 'palmeiras', 'corinthians', etc.
    data_primeiro_acesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_vencimento TIMESTAMP,
    canal_atual VARCHAR(50) DEFAULT 'Nenhum' -- Atualizado pelo ping da TV
);
