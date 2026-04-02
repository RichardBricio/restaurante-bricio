import { PrismaClient } from '@prisma/client';
import { gerarPix } from '../services/pagamentoService.js';

const prisma = new PrismaClient();

export const criarPedido = async (req, res) => {
  try {
    const { userId, itens } = req.body;

    let total = 0;
    const itensPedido = [];

    // Verifica estoque
    for (const item of itens) {
      const produto = await prisma.produto.findUnique({ where: { id: item.produtoId } });

      if (!produto) {
        return res.status(404).json({ error: `Produto ${item.produtoId} não encontrado` });
      }

      if (produto.temEstoque && produto.quantidade < item.quantidade) {
        return res.status(400).json({
          error: `😢 ${produto.nome} está com estoque baixo! Temos apenas ${produto.quantidade} unidades.`
        });
      }

      const subtotal = produto.preco * item.quantidade;
      total += subtotal;

      itensPedido.push({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: produto.preco
      });

      // Atualiza estoque
      if (produto.temEstoque) {
        await prisma.produto.update({
          where: { id: item.produtoId },
          data: { quantidade: produto.quantidade - item.quantidade }
        });
      }
    }

    // Cria pedido
    const pedido = await prisma.pedido.create({
      data: {
        userId,
        total,
        itens: { create: itensPedido }
      },
      include: { itens: true }
    });

    // Gera PIX
    const pixData = await gerarPix(pedido.id, total);

    await prisma.pedido.update({
      where: { id: pedido.id },
      data: {
        pixQrCode: pixData.qr_code,
        pixPayload: pixData.qr_code_base64
      }
    });

    res.json({
      success: true,
      pedido,
      pix: {
        qrCode: pixData.qr_code,
        qrCodeBase64: pixData.qr_code_base64,
        copiaCola: pixData.qr_code
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarPedidosAdmin = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        user: true,
        itens: { include: { produto: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusMessages = {
      EM_PREPARO: '👨‍🍳 Pedido entrou na cozinha!',
      FINALIZADO: '✅ Pedido finalizado! Bom apetite!',
      CANCELADO: '❌ Pedido cancelado'
    };

    const pedido = await prisma.pedido.update({
      where: { id },
      data: { status }
    });

    res.json({
      success: true,
      message: statusMessages[status] || 'Status atualizado',
      pedido
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};