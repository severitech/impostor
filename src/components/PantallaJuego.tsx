// components/PantallaJuego/PantallaJuego.tsx
import React, { useState, useEffect } from "react";
import { useGameStoreTyped } from "@/hook/useGameStoreTyped";
import CartaJugador from "./CartaJugador";
import { ArrowLeft } from "lucide-react";

const PantallaJuego: React.FC = () => {
  const { siguienteJugador, revelarCartaActual, setEstado } =
    useGameStoreTyped.useAcciones();

  const jugadorActual = useGameStoreTyped.useJugadorActual();
  const jugadorActualIndex = useGameStoreTyped.useJugadorActualIndex();
  const jugadores = useGameStoreTyped.useJugadores();
  const configuracion = useGameStoreTyped.useConfiguracion();

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [jugadorActualIndex]);

  if (!jugadorActual) {
    return (
      <div className="h-full bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">⚠️ Error</h1>
          <p className="text-gray-300">
            No hay jugador actual. Reinicia el juego.
          </p>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      revelarCartaActual();
    } else {
      setIsFlipped(false);
      setTimeout(() => {
        siguienteJugador();
      }, 250);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Estás seguro de que quieres salir del juego?")) {
      setEstado("configuracion");
    }
  };

  return (
    <div className="w-full flex-1 bg-black text-white flex flex-col items-center p-4 select-none">
      {/* Botón Atrás - posicionado relativo */}
      <div className="w-full max-w-4xl relative mb-4">
        <button
          onClick={handleBack}
          className="absolute left-0 top-0 p-2 hover:bg-gray-800/80 rounded-lg transition-colors z-50"
          aria-label="Volver atrás"
        >
          <ArrowLeft className="w-6 h-6 text-gray-300 hover:text-white" />
        </button>

        {/* Indicador de Progreso centrado */}
        <div className="text-center">
          <div className="text-gray-400 text-sm font-medium tracking-widest uppercase">
            Jugador {jugadorActualIndex + 1} de {jugadores.length}
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">
            {jugadorActual.nombre}
          </h1>
        </div>
      </div>

      {/* Carta */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full">
        <div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[3/4] cursor-pointer mb-6"
          onClick={handleClick}
        >
          <CartaJugador
            jugador={jugadorActual}
            isFlipped={isFlipped}
            dificultad={configuracion.dificultad}
          />
        </div>

        {/* Instrucciones */}
        <div className="text-center px-4">
          <p
            className={`text-gray-300 text-lg mb-2 ${
              !isFlipped ? "animate-pulse" : ""
            }`}
          >
            {!isFlipped
              ? "Toca la carta para revelar tu rol"
              : "Toca de nuevo para pasar al siguiente"}
          </p>
          <p className="text-gray-500 text-sm">
            {configuracion.seleccionCategorias.categorias &&
              `Categoría: ${configuracion.seleccionCategorias.categorias}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PantallaJuego;
