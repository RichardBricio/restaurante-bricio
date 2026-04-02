package com.restaurante.bricio.service;

import com.restaurante.bricio.model.Produto;
import com.restaurante.bricio.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final ImagemService imagemService;

    public List<Produto> listarTodos(String categoria) {
        if (categoria != null && !categoria.equals("todos")) {
            return produtoRepository.findByCategoria(categoria);
        }
        return produtoRepository.findAll();
    }

    public Produto criarProduto(Produto produto) {
        // Busca imagem automaticamente
        String imagemUrl = imagemService.buscarImagemProduto(
                produto.getNome(),
                produto.getCategoria()
        );
        produto.setImagemUrl(imagemUrl);
        produto.setCreatedAt(LocalDateTime.now());

        return produtoRepository.save(produto);
    }

    public Produto atualizarProduto(String id, Produto produtoAtualizado) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produto.setNome(produtoAtualizado.getNome());
        produto.setCategoria(produtoAtualizado.getCategoria());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setTemEstoque(produtoAtualizado.getTemEstoque());
        produto.setQuantidade(produtoAtualizado.getQuantidade());
        produto.setUpdatedAt(LocalDateTime.now());

        // Se mudou nome/categoria, busca nova imagem
        if (!produto.getNome().equals(produtoAtualizado.getNome()) ||
                !produto.getCategoria().equals(produtoAtualizado.getCategoria())) {
            String novaImagem = imagemService.buscarImagemProduto(
                    produtoAtualizado.getNome(),
                    produtoAtualizado.getCategoria()
            );
            produto.setImagemUrl(novaImagem);
        }

        return produtoRepository.save(produto);
    }

    public void deletarProduto(String id) {
        produtoRepository.deleteById(id);
    }
}