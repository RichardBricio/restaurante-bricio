const categorias = [
  { id: 'todos', nome: 'Todos', emoji: '🍽️' },
  { id: 'Pizzas', nome: 'Pizzas', emoji: '🍕' },
  { id: 'Bebidas', nome: 'Bebidas', emoji: '🥤' },
  { id: 'Sobremesas', nome: 'Sobremesas', emoji: '🍰' },
  { id: 'Lanches', nome: 'Lanches', emoji: '🍔' },
  { id: 'Porções', nome: 'Porções', emoji: '🍟' },
  { id: 'Saladas', nome: 'Saladas', emoji: '🥗' }
];

export default function FiltroCategorias({ categoriaAtual, onMudarCategoria }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
      {categorias.map(cat => (
        <button
          key={cat.id}
          onClick={() => onMudarCategoria(cat.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
            ${categoriaAtual === cat.id
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          <span className="text-xl">{cat.emoji}</span>
          <span className="font-medium">{cat.nome}</span>
        </button>
      ))}
    </div>
  );
}