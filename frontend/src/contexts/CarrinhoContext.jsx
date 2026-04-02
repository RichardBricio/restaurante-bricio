import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CarrinhoContext = createContext({});

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Carregar carrinho do localStorage
    const savedCart = localStorage.getItem('carrinho');
    if (savedCart) {
      setItens(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Salvar no localStorage
    localStorage.setItem('carrinho', JSON.stringify(itens));

    // Calcular total
    const novoTotal = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    setTotal(novoTotal);
  }, [itens]);

  const adicionarItem = (produto) => {
    setItens(current => {
      const existe = current.find(item => item.id === produto.id);

      if (existe) {
        // Verificar estoque
        if (produto.temEstoque && produto.quantidade <= existe.quantidade) {
          toast.error(`😢 ${produto.nome} - Estoque insuficiente!`);
          return current;
        }

        toast.success(`➕ Mais um ${produto.nome} adicionado!`);
        return current.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      toast.success(`🍔 ${produto.nome} adicionado ao carrinho!`);
      return [...current, { ...produto, quantidade: 1 }];
    });
  };

  const removerItem = (produtoId) => {
    setItens(current => {
      const item = current.find(item => item.id === produtoId);
      if (item.quantidade === 1) {
        toast.success(`🗑️ ${item.nome} removido do carrinho`);
        return current.filter(item => item.id !== produtoId);
      }

      toast.success(`➖ Uma unidade de ${item.nome} removida`);
      return current.map(item =>
        item.id === produtoId
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      );
    });
  };

  const limparCarrinho = () => {
    setItens([]);
    toast.success('🧹 Carrinho limpo!');
  };

  return (
    <CarrinhoContext.Provider value={{
      itens,
      total,
      adicionarItem,
      removerItem,
      limparCarrinho
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);