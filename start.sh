#!/bin/bash

echo "🚀 Iniciando Restaurante Boomer..."

# Verifica se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi

# Sobe os containers
echo "📦 Construindo e iniciando containers..."
docker-compose up -d --build

# Aguarda os serviços
echo "⏳ Aguardando serviços iniciarem..."
sleep 10

# Verifica status
echo "✅ Serviços rodando:"
docker-compose ps

echo ""
echo "🌐 Acesse:"
echo "   Frontend: http://localhost:5173"
echo "   Backend: http://localhost:3333/api/health"
echo "   Adminer: http://localhost:8080 (opcional)"
echo ""
echo "📝 Logs: docker-compose logs -f"
echo "🛑 Parar: docker-compose down"