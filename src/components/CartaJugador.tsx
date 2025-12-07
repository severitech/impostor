// components/PantallaJuego/CartaJugador.tsx
import React from 'react';
import type { Jugador } from '@/types/Juego.type';
import { Eye } from 'lucide-react';

interface CartaJugadorProps {
  jugador: Jugador;
  isFlipped: boolean;
  dificultad: 'facil' | 'dificil';
}

const CartaJugador: React.FC<CartaJugadorProps> = ({ jugador, isFlipped, dificultad }) => {
  return (
    <div className="w-full h-full relative" style={{ perspective: "1000px" }}>
      <div 
        className="w-full h-full relative transition-transform duration-500"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* FRENTE (Antes de revelar) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center bg-gray-800 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-6xl mb-6">👤</div>
          <h2 className="text-3xl font-bold mb-2 text-white">{jugador.nombre}</h2>
          <div className="mt-8 animate-pulse">
            <div className="flex items-center justify-center gap-2 text-blue-400">
              <Eye className="w-6 h-6" />
              <span className="text-lg font-semibold">Toca para revelar</span>
            </div>
          </div>
        </div>

        {/* REVERSO (Revelado) */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center backface-hidden ${
            jugador.rol === 'impostor' ? 'bg-red-600' : 'bg-blue-600'
          }`}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="text-6xl mb-4 animate-bounce">
            {jugador.rol === 'impostor' ? '🤫' : '🫡'}
          </div>
          
          <h2 className="text-4xl font-black mb-2 uppercase tracking-wider text-white">
            {jugador.rol === 'impostor' ? 'IMPOSTOR' : 'TRIPULANTE'}
          </h2>

          <div className="mt-8 bg-black/20 rounded-xl p-6 w-full">
            <p className="text-sm uppercase tracking-widest opacity-75 mb-2 text-white">
              {jugador.rol === 'impostor' ? 'TU PISTA' : 'PALABRA SECRETA'}
            </p>
            <p className="text-3xl font-bold text-white">
              {jugador.rol === 'impostor' 
                ? (dificultad === 'facil' ? jugador.pista : '???') 
                : jugador.palabra}
            </p>
            {jugador.rol === 'impostor' && dificultad === 'dificil' && (
              <p className="text-xs mt-2 text-white/70">
                (Modo Difícil: Sin pista)
              </p>
            )}
          </div>
          
          <div className="mt-8 text-white/50 text-sm">
            Toca de nuevo para terminar turno
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartaJugador;
