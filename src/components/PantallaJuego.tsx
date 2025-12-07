// components/PantallaJuego/PantallaJuego.tsx
import React, { useState, useEffect } from 'react';
import { useGameStoreTyped } from '@/hook/useGameStoreTyped';
import CartaJugador from './CartaJugador';
import { ArrowLeft } from 'lucide-react';

const PantallaJuego: React.FC = () => {
  const { 
    siguienteJugador,
    revelarCartaActual,
    setEstado
  } = useGameStoreTyped.useAcciones();

  const jugadorActual = useGameStoreTyped.useJugadorActual();
  const jugadorActualIndex = useGameStoreTyped.useJugadorActualIndex();
  const jugadores = useGameStoreTyped.useJugadores();
  const configuracion = useGameStoreTyped.useConfiguracion();
  
  // Estado local para controlar la animación de volteo
  const [isFlipped, setIsFlipped] = useState(false);

  // Resetear el estado de volteo cuando cambia el jugador
  useEffect(() => {
    setIsFlipped(false);
  }, [jugadorActualIndex]);

  if (!jugadorActual) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">⚠️ Error</h1>
          <p>No hay jugador actual. Reinicia el juego.</p>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    if (!isFlipped) {
      // Primer clic: Revelar (Voltear)
      setIsFlipped(true);
      revelarCartaActual();
    } else {
      // Segundo clic: Ocultar primero, luego cambiar datos a mitad de animación
      setIsFlipped(false);
      setTimeout(() => {
        siguienteJugador();
      }, 250); // Cambiar justo cuando la carta está de perfil (90 grados)
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Estás seguro de que quieres salir del juego?')) {
      setEstado('configuracion');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 select-none relative">
      {/* Botón Atrás */}
      <button 
        onClick={handleBack}
        className="absolute left-4 top-4 p-2 hover:bg-gray-800 rounded-full transition-colors z-50"
      >
        <ArrowLeft className="w-8 h-8 text-gray-400 hover:text-white" />
      </button>

      {/* Indicador de Progreso Discreto */}
      <div className="absolute top-6 text-gray-500 text-sm font-medium tracking-widest uppercase">
        Jugador {jugadorActualIndex + 1} de {jugadores.length}
      </div>

      {/* Área Interactiva Principal */}
      <div 
        className="w-full max-w-md aspect-[3/4] cursor-pointer"
        onClick={handleClick}
      >
        <CartaJugador 
          jugador={jugadorActual}
          isFlipped={isFlipped}
          dificultad={configuracion.dificultad}
        />
      </div>

      {/* Instrucción sutil */}
      <div className="absolute bottom-8 text-gray-400 text-center px-4">
        <p className="animate-pulse">
          {!isFlipped 
            ? "Toca la carta para revelar tu rol" 
            : "Toca de nuevo para pasar al siguiente jugador"}
        </p>
      </div>
    </div>
  );
};

export default PantallaJuego;
