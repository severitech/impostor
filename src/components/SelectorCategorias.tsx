// components/SelectorCategorias/SelectorCategorias.tsx
import { CATEGORIAS_PRINCIPALES } from '@/data/Categorias';
import { useGameStoreTyped } from '@/hook/useGameStoreTyped';
import type { CategoriaPrincipal } from '@/types/Juego.type';
import React, { useState } from 'react';

const SelectorCategorias: React.FC = () => {
  const { setEstado, setCategorias } = useGameStoreTyped.useAcciones();
  const [seleccion, setSeleccion] = useState<CategoriaPrincipal[]>(['todas']);

  const toggleCategoria = (id: CategoriaPrincipal) => {
    if (id === 'todas') {
      setSeleccion(['todas']);
      return;
    }

    let nuevaSeleccion: CategoriaPrincipal[] = seleccion.filter(c => c !== 'todas');
    
    if (nuevaSeleccion.includes(id)) {
      nuevaSeleccion = nuevaSeleccion.filter(c => c !== id);
    } else {
      nuevaSeleccion = [...nuevaSeleccion, id];
    }

    if (nuevaSeleccion.length === 0) {
      nuevaSeleccion = ['todas'];
    }

    setSeleccion(nuevaSeleccion);
  };

  const iniciar = () => {
    setCategorias(seleccion);
    setEstado('configuracion');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-4xl w-full">
        <h1 className="text-6xl font-black mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          IMPOSTOR
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Selecciona las categorías para jugar
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {CATEGORIAS_PRINCIPALES.map((cat) => {
            const isSelected = seleccion.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategoria(cat.id)}
                className={`p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 border-2 ${
                  isSelected 
                    ? `${cat.color} border-transparent scale-105 shadow-lg` 
                    : 'bg-gray-800 border-gray-700 hover:border-gray-500 hover:bg-gray-750'
                }`}
              >
                <span className="text-4xl">{cat.icono}</span>
                <span className="font-bold text-lg">{cat.nombre}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={iniciar}
          className="bg-white text-black px-12 py-6 rounded-full text-2xl font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          JUGAR AHORA
        </button>
      </div>
    </div>
  );
};

export default SelectorCategorias;
