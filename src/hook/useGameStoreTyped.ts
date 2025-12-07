import { useGameStore } from "@/server/Juego/Juego";

// Hook personalizado con selectores para mejor performance
export const useGameStoreTyped = {
  // Estado completo
  useEstado: () => useGameStore((state) => state.estado),
  useConfiguracion: () => useGameStore((state) => state.configuracion),
  useJugadores: () => useGameStore((state) => state.jugadores),
  useRondas: () => useGameStore((state) => state.rondas),
  
  // Estado específico del juego
  useRondaActual: () => useGameStore((state) => state.rondaActual),
  usePalabraActual: () => useGameStore((state) => state.palabraActual),
  usePistaActual: () => useGameStore((state) => state.pistaActual),
  useJugadorActualIndex: () => useGameStore((state) => state.jugadorActualIndex),
  
  // Selectores compuestos
  useJugadorActual: () => useGameStore((state) => state.getJugadorActual()),
  useImpostores: () => useGameStore((state) => state.getImpostores()),
  useTripulantes: () => useGameStore((state) => state.getTripulantes()),
  useTodosHanVisto: () => useGameStore((state) => state.getTodosHanVisto()),
  
  useEsUltimoJugador: () => useGameStore((state) => {
    return state.jugadorActualIndex >= state.jugadores.length - 1;
  }),
  
  useRondaActualInfo: () => useGameStore((state) => {
    if (state.rondaActual >= 0 && state.rondaActual < state.rondas.length) {
      return state.rondas[state.rondaActual];
    }
    return null;
  }),
  
  // Acciones
  useAcciones: () => ({
    setEstado: useGameStore((state) => state.setEstado),
    setCategorias: useGameStore((state) => state.setCategorias),
    setNumImpostores: useGameStore((state) => state.setNumImpostores),
    setDificultad: useGameStore((state) => state.setDificultad),
    agregarJugador: useGameStore((state) => state.agregarJugador),
    eliminarJugador: useGameStore((state) => state.eliminarJugador),
    iniciarJuego: useGameStore((state) => state.iniciarJuego),
    iniciarNuevaRonda: useGameStore((state) => state.iniciarNuevaRonda),
    siguienteJugador: useGameStore((state) => state.siguienteJugador),
    revelarCartaActual: useGameStore((state) => state.revelarCartaActual),
    completarRonda: useGameStore((state) => state.completarRonda),
    reiniciarJuego: useGameStore((state) => state.reiniciarJuego),
  })
};