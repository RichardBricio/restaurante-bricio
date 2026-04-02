# verificar-projeto.ps1
Write-Host "🔍 VERIFICANDO PROJETO RESTAURANTE BOOMER" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$ERROS = 0

# Função para verificar arquivo
function Check-File {
    param($path)
    if (Test-Path $path) {
        Write-Host "✅ $path" -ForegroundColor Green
        return $true
    } else {
        Write-Host "❌ FALTANDO: $path" -ForegroundColor Red
        $script:ERROS++
        return $false
    }
}

# Função para verificar diretório
function Check-Dir {
    param($path)
    if (Test-Path $path) {
        Write-Host "✅ $path/" -ForegroundColor Green
        return $true
    } else {
        Write-Host "❌ FALTANDO: $path/" -ForegroundColor Red
        $script:ERROS++
        return $false
    }
}

Write-Host "📁 ESTRUTURA DE DIRETÓRIOS:" -ForegroundColor Yellow
Write-Host "---------------------------"
Check-Dir "backend"
Check-Dir "backend\src"
Check-Dir "backend\src\main"
Check-Dir "backend\src\main\java"
Check-Dir "backend\src\main\java\com"
Check-Dir "backend\src\main\java\com\restaurante"
Check-Dir "backend\src\main\java\com\restaurante\boomer"
Check-Dir "backend\src\main\java\com\restaurante\boomer\controller"
Check-Dir "backend\src\main\java\com\restaurante\boomer\service"
Check-Dir "backend\src\main\java\com\restaurante\boomer\repository"
Check-Dir "backend\src\main\java\com\restaurante\boomer\model"
Check-Dir "backend\src\main\java\com\restaurante\boomer\config"
Check-Dir "backend\src\main\resources"
Check-Dir "frontend"
Check-Dir "frontend\src"
Check-Dir "frontend\src\components"
Check-Dir "frontend\src\pages"
Check-Dir "frontend\src\contexts"
Check-Dir "frontend\src\services"
Check-Dir "frontend\src\styles"

Write-Host ""
Write-Host "📄 ARQUIVOS DO BACKEND:" -ForegroundColor Yellow
Write-Host "----------------------"
Check-File "backend\pom.xml"
Check-File "backend\Dockerfile"
Check-File "backend\wait-for-it.sh"
Check-File "backend\src\main\resources\application.properties"
Check-File "backend\src\main\java\com\restaurante\boomer\BoomerApplication.java"
Check-File "backend\src\main\java\com\restaurante\boomer\model\Usuario.java"
Check-File "backend\src\main\java\com\restaurante\boomer\model\Produto.java"
Check-File "backend\src\main\java\com\restaurante\boomer\model\Pedido.java"
Check-File "backend\src\main\java\com\restaurante\boomer\repository\ProdutoRepository.java"
Check-File "backend\src\main\java\com\restaurante\boomer\service\ImagemService.java"
Check-File "backend\src\main\java\com\restaurante\boomer\service\ProdutoService.java"
Check-File "backend\src\main\java\com\restaurante\boomer\controller\ProdutoController.java"

Write-Host ""
Write-Host "📄 ARQUIVOS DO FRONTEND:" -ForegroundColor Yellow
Write-Host "----------------------"
Check-File "frontend\package.json"
Check-File "frontend\Dockerfile"
Check-File "frontend\nginx.conf"
Check-File "frontend\vite.config.js"
Check-File "frontend\tailwind.config.js"
Check-File "frontend\index.html"
Check-File "frontend\src\main.jsx"
Check-File "frontend\src\App.jsx"
Check-File "frontend\src\styles\globals.css"
Check-File "frontend\src\contexts\AuthContext.jsx"
Check-File "frontend\src\services\api.js"
Check-File "frontend\src\pages\Login.jsx"
Check-File "frontend\src\pages\Cliente\Cardapio.jsx"

Write-Host ""
Write-Host "🐳 ARQUIVOS DOCKER:" -ForegroundColor Yellow
Write-Host "-----------------"
Check-File "docker-compose.yml"
Check-File ".env"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
if ($ERROS -eq 0) {
    Write-Host "✅ PARABÉNS! Projeto está completo!" -ForegroundColor Green
    Write-Host "   Você pode rodar: docker-compose up --build" -ForegroundColor Green
} else {
    Write-Host "❌ Encontrados $ERROS problemas no projeto" -ForegroundColor Red
    Write-Host "   Verifique os itens marcados com ❌ acima" -ForegroundColor Yellow
}
Write-Host "=========================================" -ForegroundColor Cyan