#!/bin/bash

echo "🔍 VERIFICANDO PROJETO RESTAURANTE BRICIO"
echo "========================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERROS=0

# Função para verificar arquivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1${NC}"
        return 0
    else
        echo -e "${RED}❌ FALTANDO: $1${NC}"
        ERROS=$((ERROS+1))
        return 1
    fi
}

# Função para verificar diretório
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅ $1/${NC}"
        return 0
    else
        echo -e "${RED}❌ FALTANDO: $1/${NC}"
        ERROS=$((ERROS+1))
        return 1
    fi
}

echo "📁 ESTRUTURA DE DIRETÓRIOS:"
echo "---------------------------"
check_dir "backend"
check_dir "backend/src"
check_dir "backend/src/main"
check_dir "backend/src/main/java"
check_dir "backend/src/main/java/com"
check_dir "backend/src/main/java/com/restaurante"
check_dir "backend/src/main/java/com/restaurante/bricio"
check_dir "backend/src/main/java/com/restaurante/bricio/controller"
check_dir "backend/src/main/java/com/restaurante/bricio/service"
check_dir "backend/src/main/java/com/restaurante/bricio/repository"
check_dir "backend/src/main/java/com/restaurante/bricio/model"
check_dir "backend/src/main/java/com/restaurante/bricio/config"
check_dir "backend/src/main/java/com/restaurante/bricio/dto"
check_dir "backend/src/main/java/com/restaurante/bricio/exception"
check_dir "backend/src/main/resources"
check_dir "frontend"
check_dir "frontend/src"
check_dir "frontend/src/components"
check_dir "frontend/src/components/common"
check_dir "frontend/src/components/cliente"
check_dir "frontend/src/components/admin"
check_dir "frontend/src/pages"
check_dir "frontend/src/pages/Cliente"
check_dir "frontend/src/pages/Admin"
check_dir "frontend/src/contexts"
check_dir "frontend/src/services"
check_dir "frontend/src/styles"
check_dir "frontend/src/utils"

echo ""
echo "📄 ARQUIVOS DO BACKEND:"
echo "----------------------"
check_file "backend/pom.xml"
check_file "backend/Dockerfile"
check_file "backend/wait-for-it.sh"
check_file "backend/src/main/resources/application.properties"
check_file "backend/src/main/resources/application-docker.properties"
check_file "backend/src/main/java/com/restaurante/bricio/BricioApplication.java"

# Model
check_file "backend/src/main/java/com/restaurante/bricio/model/Usuario.java"
check_file "backend/src/main/java/com/restaurante/bricio/model/Produto.java"
check_file "backend/src/main/java/com/restaurante/bricio/model/Pedido.java"
check_file "backend/src/main/java/com/restaurante/bricio/model/PedidoItem.java"

# Repository
check_file "backend/src/main/java/com/restaurante/bricio/repository/UsuarioRepository.java"
check_file "backend/src/main/java/com/restaurante/bricio/repository/ProdutoRepository.java"
check_file "backend/src/main/java/com/restaurante/bricio/repository/PedidoRepository.java"

# Service
check_file "backend/src/main/java/com/restaurante/bricio/service/ImagemService.java"
check_file "backend/src/main/java/com/restaurante/bricio/service/ProdutoService.java"
check_file "backend/src/main/java/com/restaurante/bricio/service/PedidoService.java"
check_file "backend/src/main/java/com/restaurante/bricio/service/PagamentoPixService.java"

# Controller
check_file "backend/src/main/java/com/restaurante/bricio/controller/ProdutoController.java"
check_file "backend/src/main/java/com/restaurante/bricio/controller/PedidoController.java"
check_file "backend/src/main/java/com/restaurante/bricio/controller/AuthController.java"
check_file "backend/src/main/java/com/restaurante/bricio/controller/UsuarioController.java"

# Config
check_file "backend/src/main/java/com/restaurante/bricio/config/SecurityConfig.java"
check_file "backend/src/main/java/com/restaurante/bricio/config/CorsConfig.java"
check_file "backend/src/main/java/com/restaurante/bricio/config/OpenAPIConfig.java"

echo ""
echo "📄 ARQUIVOS DO FRONTEND:"
echo "----------------------"
check_file "frontend/package.json"
check_file "frontend/Dockerfile"
check_file "frontend/nginx.conf"
check_file "frontend/vite.config.js"
check_file "frontend/tailwind.config.js"
check_file "frontend/postcss.config.js"
check_file "frontend/index.html"
check_file "frontend/src/main.jsx"
check_file "frontend/src/App.jsx"
check_file "frontend/src/styles/globals.css"

# Contexts
check_file "frontend/src/contexts/AuthContext.jsx"
check_file "frontend/src/contexts/CarrinhoContext.jsx"

# Services
check_file "frontend/src/services/api.js"
check_file "frontend/src/services/firebase.js"

# Pages - Cliente
check_file "frontend/src/pages/Login.jsx"
check_file "frontend/src/pages/Cadastro.jsx"
check_file "frontend/src/pages/Cliente/HomeCliente.jsx"
check_file "frontend/src/pages/Cliente/Cardapio.jsx"
check_file "frontend/src/pages/Cliente/MeusPedidos.jsx"

# Pages - Admin
check_file "frontend/src/pages/Admin/DashboardAdmin.jsx"
check_file "frontend/src/pages/Admin/GerenciarProdutos.jsx"
check_file "frontend/src/pages/Admin/GerenciarClientes.jsx"
check_file "frontend/src/pages/Admin/PedidosAdmin.jsx"

# Components - Cliente
check_file "frontend/src/components/common/Header.jsx"
check_file "frontend/src/components/common/Footer.jsx"
check_file "frontend/src/components/common/LoadingSpinner.jsx"
check_file "frontend/src/components/common/PrivateRoute.jsx"
check_file "frontend/src/components/cliente/CardProduto.jsx"
check_file "frontend/src/components/cliente/CarrinhoSidebar.jsx"
check_file "frontend/src/components/cliente/FiltroCategorias.jsx"
check_file "frontend/src/components/cliente/PagamentoPix.jsx"

# Components - Admin
check_file "frontend/src/components/admin/AdminHeader.jsx"
check_file "frontend/src/components/admin/TabelaPedidos.jsx"
check_file "frontend/src/components/admin/FormProduto.jsx"
check_file "frontend/src/components/admin/ListaClientes.jsx"

echo ""
echo "🐳 ARQUIVOS DOCKER:"
echo "-----------------"
check_file "docker-compose.yml"
check_file ".env"
check_file ".dockerignore"
check_file "backend/.dockerignore"
check_file "frontend/.dockerignore"

echo ""
echo "🔧 VALIDAÇÃO DE CONTEÚDO:"
echo "------------------------"

# Verificar se o pom.xml tem as dependências corretas
if [ -f "backend/pom.xml" ]; then
    if grep -q "spring-boot-starter-web" backend/pom.xml; then
        echo -e "${GREEN}✅ pom.xml contém Spring Web${NC}"
    else
        echo -e "${RED}❌ pom.xml faltando Spring Web${NC}"
        ERROS=$((ERROS+1))
    fi
    
    if grep -q "postgresql" backend/pom.xml; then
        echo -e "${GREEN}✅ pom.xml contém PostgreSQL${NC}"
    else
        echo -e "${RED}❌ pom.xml faltando PostgreSQL driver${NC}"
        ERROS=$((ERROS+1))
    fi
fi

# Verificar se o package.json tem as dependências
if [ -f "frontend/package.json" ]; then
    if grep -q "axios" frontend/package.json; then
        echo -e "${GREEN}✅ package.json contém axios${NC}"
    else
        echo -e "${RED}❌ package.json faltando axios${NC}"
        ERROS=$((ERROS+1))
    fi
    
    if grep -q "react-router-dom" frontend/package.json; then
        echo -e "${GREEN}✅ package.json contém react-router-dom${NC}"
    else
        echo -e "${RED}❌ package.json faltando react-router-dom${NC}"
        ERROS=$((ERROS+1))
    fi
fi

# Verificar docker-compose.yml
if [ -f "docker-compose.yml" ]; then
    if grep -q "postgres:" docker-compose.yml; then
        echo -e "${GREEN}✅ docker-compose.yml tem serviço PostgreSQL${NC}"
    else
        echo -e "${RED}❌ docker-compose.yml faltando PostgreSQL${NC}"
        ERROS=$((ERROS+1))
    fi
    
    if grep -q "backend:" docker-compose.yml; then
        echo -e "${GREEN}✅ docker-compose.yml tem serviço Backend${NC}"
    else
        echo -e "${RED}❌ docker-compose.yml faltando Backend${NC}"
        ERROS=$((ERROS+1))
    fi
    
    if grep -q "frontend:" docker-compose.yml; then
        echo -e "${GREEN}✅ docker-compose.yml tem serviço Frontend${NC}"
    else
        echo -e "${RED}❌ docker-compose.yml faltando Frontend${NC}"
        ERROS=$((ERROS+1))
    fi
fi

# Verificar se o package.json tem script de dev
if [ -f "frontend/package.json" ]; then
    if grep -q "\"dev\"" frontend/package.json; then
        echo -e "${GREEN}✅ package.json tem script dev${NC}"
    else
        echo -e "${RED}❌ package.json faltando script dev${NC}"
        ERROS=$((ERROS+1))
    fi
fi

echo ""
echo "========================================="
if [ $ERROS -eq 0 ]; then
    echo -e "${GREEN}✅ PARABÉNS! Projeto está completo!${NC}"
    echo -e "${GREEN}   Você pode rodar: docker-compose up --build${NC}"
else
    echo -e "${RED}❌ Encontrados $ERROS problemas no projeto${NC}"
    echo -e "${YELLOW}   Verifique os itens marcados com ❌ acima${NC}"
fi
echo "========================================="