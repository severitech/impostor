// components/PantallaConfiguracion/PantallaConfiguracion.tsx
import { useGameStoreTyped } from "@/hook/useGameStoreTyped";
import { ArrowLeft, Users, Brain, UserPlus, Play, List } from "lucide-react";
import React, { useState } from "react";

const PantallaConfiguracion: React.FC = () => {
  const jugadores = useGameStoreTyped.useJugadores();
  const configuracion = useGameStoreTyped.useConfiguracion();
  const {
    agregarJugador,
    eliminarJugador,
    iniciarJuego,
    setEstado,
    setNumImpostores,
    setDificultad,
  } = useGameStoreTyped.useAcciones();

  const [nuevoJugador, setNuevoJugador] = useState("");

  const manejarAgregarJugador = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoJugador.trim()) {
      agregarJugador(nuevoJugador);
      setNuevoJugador("");
    }
  };

  const manejarIniciarJuego = () => {
    // Validación del lado del cliente primero
    const minimoJugadores = configuracion.numImpostores + 1;
    
    if (jugadores.length < minimoJugadores) {
      alert(`Se necesitan al menos ${minimoJugadores} jugadores para jugar con ${configuracion.numImpostores} impostor(es)`);
      return;
    }
    
    const exito = iniciarJuego();
    if (!exito) {
      alert('Error al iniciar el juego. Por favor, intenta de nuevo.');
    }
  };

  // Verificar si se puede iniciar el juego
  const puedeIniciar = jugadores.length >= configuracion.numImpostores + 1;

  return (
    <div className="w-full flex-1 bg-gray-900 text-white p-4 md:p-6 flex flex-col items-center overflow-hidden">
      <div className="max-w-2xl w-full space-y-4 md:space-y-6 relative">
        {/* Botón Atrás */}
        <button
          onClick={() => setEstado("seleccionCategoria")}
          className="absolute left-0 top-0 md:top-2 p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Encabezado */}
        <div className="text-center pt-8 md:pt-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">
            Configuración
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Prepara tu partida
          </p>
        </div>

        {/* Selector de Impostores */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
            <h2 className="text-lg md:text-xl font-bold">
              Número de Impostores
            </h2>
          </div>

          <div className="flex gap-2 justify-center">
            {([1, 2, 3] as const).map((num) => (
              <button
                key={num}
                onClick={() => setNumImpostores(num)}
                className={`flex-1 py-2 rounded-2xl font-bold text-sm md:text-base transition-all ${
                  configuracion.numImpostores === num
                    ? "bg-red-600 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {num} {num === 1 ? "Impostor" : "Impostores"}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Dificultad */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-3 mb-2 md:mb-3">
            <Brain className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
            <h2 className="text-lg md:text-xl font-bold">Dificultad</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => setDificultad("facil")}
              className={`flex-1 py-2 rounded-2xl font-bold text-sm md:text-base transition-all ${
                configuracion.dificultad === "facil"
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              Fácil (Con Pista)
            </button>
            <button
              onClick={() => setDificultad("dificil")}
              className={`flex-1 py-2 rounded-2xl font-bold text-sm md:text-base transition-all ${
                configuracion.dificultad === "dificil"
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              Difícil (Sin Pista)
            </button>
          </div>
        </div>

        {/* Botón Iniciar */}
        <button
          onClick={manejarIniciarJuego}
          disabled={!puedeIniciar}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 md:py-4 rounded-3xl text-lg md:text-xl font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Play className="w-6 h-6 fill-current" />
          {!puedeIniciar
            ? `Faltan jugadores (Mínimo ${configuracion.numImpostores + 1})`
            : "COMENZAR JUEGO"}
        </button>

        {/* Lista de Jugadores */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-3xl shadow-lg">
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
            <List className="w-5 h-5 text-blue-400" /> Lista de Jugadores
          </h2>

          <form
            onSubmit={manejarAgregarJugador}
            className="flex gap-2 mb-4 md:mb-6"
          >
            <input
              type="text"
              value={nuevoJugador}
              onChange={(e) => setNuevoJugador(e.target.value)}
              placeholder="Nombre del jugador..."
              className="flex-1 bg-gray-700 border-none rounded-2xl px-4 py-2 md:py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
              autoFocus
            />
            <button
              type="submit"
              disabled={!nuevoJugador.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold transition-colors text-sm md:text-base flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </form>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {jugadores.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No hay jugadores todavía. ¡Agrega algunos!
              </p>
            ) : (
              jugadores.map((jugador) => (
                <div
                  key={jugador.id}
                  className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg group hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium text-lg">{jugador.nombre}</span>
                  <button
                    onClick={() => eliminarJugador(jugador.id)}
                    className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                    title="Eliminar jugador"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 text-right text-sm text-gray-400">
            Total: {jugadores.length} jugadores
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantallaConfiguracion;
