import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">🍔</div>
              <h3 className="text-xl font-bold">Restaurante Bricio</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Sabor que emociona desde 2024. Fazemos seu dia mais saboroso!
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Horário de Funcionamento</h4>
            <p className="text-gray-400 text-sm">Segunda a Sábado: 11h às 23h</p>
            <p className="text-gray-400 text-sm">Domingo: 11h às 22h</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>Feito com <Heart size={14} className="inline text-red-500" /> para você</p>
          <p>&copy; 2024 Restaurante Bricio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}