import { PrismaClient } from '@prisma/client';
import { buscarImagemProduto } from '../services/imagemService.js';

const prisma = new PrismaClient();

export const criarProduto = async (req, res) => {
  try {
    const { nome, categoria, preco, descricao, temEstoque, quantidade } = req.body;

    // Busca imagem automaticamente com IA/Unsplash
    const imagemUrl = await buscarImagemProduto(nome, categoria);

    const produto = await prisma.produto.create({
      data: {
        nome,
        categoria,
        preco: parseFloat(preco),
        descricao,
        temEstoque: temEstoque === true || temEstoque === 'true',
        quantidade: temEstoque ? parseInt(quantidade) : null,
        imagemUrl
      }
    });

    res.status(201).json({
      success: true,
      message: '🍔 Produto criado com sucesso! Imagem gerada por IA.',
      produto
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarProdutos = async (req, res) => {
  try {
    const { categoria } = req.query;
    const where = categoria && categoria !== 'todos' ? { categoria } : {};

    const produtos = await prisma.produto.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, categoria, preco, descricao, temEstoque, quantidade } = req.body;

    // Se mudou nome/categoria, busca nova imagem
    let imagemUrl;
    if (nome || categoria) {
      const novoNome = nome || (await prisma.produto.findUnique({ where: { id } })).nome;
      const novaCategoria = categoria || (await prisma.produto.findUnique({ where: { id } })).categoria;
      imagemUrl = await buscarImagemProduto(novoNome, novaCategoria);
    }

    const produto = await prisma.produto.update({
      where: { id },
      data: {
        nome,
        categoria,
        preco: preco ? parseFloat(preco) : undefined,
        descricao,
        temEstoque: temEstoque !== undefined ? temEstoque : undefined,
        quantidade: quantidade ? parseInt(quantidade) : undefined,
        imagemUrl
      }
    });

    res.json({ success: true, produto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    await prisma.produto.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Produto removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};