// frontend/src/pages/Admin/NovoProduto.jsx
import { useState } from 'react';

export default function NovoProduto() {
  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    preco: '',
    temEstoque: true,
    quantidade: ''
  });
  const [imagemPreview, setImagemPreview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1. Envia o produto para o backend
    const response = await fetch('/api/produtos', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    });
    const produto = await response.json();
    // 2. O backend já terá preenchido imagemUrl automaticamente
    setImagemPreview(produto.imagemUrl);
    alert('Produto criado com imagem via IA!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Novo Produto (com imagem automática)</h2>
      <input placeholder="Nome" onChange={e => setForm({...form, nome: e.target.value})} />
      <select onChange={e => setForm({...form, categoria: e.target.value})}>
        <option>Bebidas</option>
        <option>Pizzas</option>
        <option>Sobremesas</option>
      </select>
      <input type="number" placeholder="Preço" onChange={e => setForm({...form, preco: e.target.value})} />
      <label>
        <input type="checkbox" checked={form.temEstoque} onChange={e => setForm({...form, temEstoque: e.target.checked})} />
        Controlar estoque?
      </label>
      {form.temEstoque && (
        <input type="number" placeholder="Quantidade" onChange={e => setForm({...form, quantidade: e.target.value})} />
      )}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Salvar (IA busca imagem)</button>
      {imagemPreview && <img src={imagemPreview} className="w-32 h-32 object-cover" />}
    </form>
  );
}