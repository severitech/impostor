// components/PantallaJuego/CartaJugador.tsx
import React from 'react';
import type { Jugador } from '@/types/Juego.type';
import { Eye, User, VenetianMask, UserCheck } from 'lucide-react';

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
          className="absolute inset-0 w-full h-full rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-4 md:p-8 text-center bg-gray-800 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-3 md:mb-6 text-gray-400">
            <User className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-white">{jugador.nombre}</h2>
          <div className="mt-4 md:mt-8 animate-pulse">
            <div className="flex items-center justify-center gap-2 text-blue-400">
              <Eye className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-base md:text-lg font-semibold">Toca para revelar</span>
            </div>
          </div>
        </div>

        {/* REVERSO (Revelado) */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-4 md:p-8 text-center backface-hidden ${
            jugador.rol === 'impostor' ? 'bg-red-600' : 'bg-blue-600'
          }`}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="mb-2 md:mb-4 animate-bounce text-white">
            {jugador.rol === 'impostor' 
              ? <VenetianMask className="w-20 h-20 md:w-28 md:h-28" /> 
              : <UserCheck className="w-20 h-20 md:w-28 md:h-28" />
            }
          </div>
          
          <h2 className="text-2xl md:text-4xl font-black mb-1 md:mb-2 uppercase tracking-wider text-white">
            {jugador.rol === 'impostor' ? 'IMPOSTOR' : 'TRIPULANTE'}
          </h2>

          <div className="mt-4 md:mt-8 bg-black/20 rounded-3xl p-4 md:p-6 w-full">
            <p className="text-xs md:text-sm uppercase tracking-widest opacity-75 mb-1 md:mb-2 text-white">
              {jugador.rol === 'impostor' ? 'TU PISTA' : 'PALABRA SECRETA'}
            </p>
            <p className="text-xl md:text-3xl font-bold text-white">
              {jugador.rol === 'impostor' 
                ? (dificultad === 'facil' ? jugador.pista : '???') 
                : jugador.palabra}
            </p>
            {jugador.rol === 'impostor' && dificultad === 'dificil' && (
              <p className="text-[10px] md:text-xs mt-1 md:mt-2 text-white/70">
                (Modo Difícil: Sin pista)
              </p>
            )}
          </div>
          
          <div className="mt-4 md:mt-8 text-white/50 text-xs md:text-sm">
            Toca de nuevo para terminar turno
          </div>
        </div>
      </div>
    </div>
  );
};


export default CartaJugador;
