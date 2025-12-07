// Versión más simple con correcciones
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { CategoriaPrincipal, Configuracion, EstadoJuego, Jugador, Rol, Ronda, Subcategoria } from '@/types/Juego.type';
import { CategoriaManager } from '@/utils/CategoriaAdministrador';

interface GameStore {
  estado: EstadoJuego;
  configuracion: Configuracion;
  jugadores: Jugador[];
  rondas: Ronda[];
  rondaActual: number;
  palabraActual: string;
  pistaActual: string;
  jugadorActualIndex: number;
  palabrasUsadas: string[];
  categoriaRondaActual: CategoriaPrincipal | null;
  subcategoriaRondaActual: Subcategoria | null;

  // ========== ACCIONES ==========
  // Navegación y estado
  setEstado: (estado: EstadoJuego) => void;
  setCategorias: (categorias: CategoriaPrincipal[]) => void;
  setNumImpostores: (num: 1 | 2 | 3) => void;
  setDificultad: (dificultad: 'facil' | 'dificil') => void;

  // Acciones principales
  agregarJugador: (nombre: string) => void;
  eliminarJugador: (id: string) => void;
  iniciarJuego: () => boolean;
  iniciarNuevaRonda: () => boolean;
  siguienteJugador: () => void;
  revelarCartaActual: () => void;
  completarRonda: () => void;
  reiniciarJuego: () => void;
  
  // Getters
  getJugadorActual: () => Jugador | null;
  getImpostores: () => Jugador[];
  getTripulantes: () => Jugador[];
  getTodosHanVisto: () => boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Estado inicial
  estado: 'seleccionCategoria',
  configuracion: {
    numImpostores: 1,
    seleccionCategorias: {
      categorias: ['todas'],
      subcategorias: [],
      modoMezclado: false
    },
    tiempoTurno: null,
    maxRondas: 10,
    dificultad: 'facil'
  },
  jugadores: [],
  rondas: [],
  rondaActual: -1,
  palabraActual: '',
  pistaActual: '',
  jugadorActualIndex: 0,
  palabrasUsadas: [],
  categoriaRondaActual: null,
  subcategoriaRondaActual: null,

  // Acciones simplificadas
  setEstado: (estado) => set({ estado }),
  
  setCategorias: (categorias) => set((state) => ({
    configuracion: {
      ...state.configuracion,
      seleccionCategorias: {
        ...state.configuracion.seleccionCategorias,
        categorias
      }
    }
  })),
  setNumImpostores: (num: 1 | 2 | 3) => set((state) => ({
    configuracion: {
      ...state.configuracion,
      numImpostores: num
    }
  })),

  setDificultad: (dificultad) => set((state) => ({
    configuracion: {
      ...state.configuracion,
      dificultad
    }
  })),

  agregarJugador: (nombre) => {
    const nombreLimpio = nombre.trim();
    const { jugadores } = get();
    
    if (!nombreLimpio || jugadores.length >= 10) return;
    if (jugadores.some(j => j.nombre.toLowerCase() === nombreLimpio.toLowerCase())) return;
    
    const nuevoJugador: Jugador = {
      id: nanoid(),
      nombre: nombreLimpio,
      rol: 'tripulante',
      palabra: '',
      pista: '',
      haVistoCarta: false,
      esActual: false,
      rondasComoImpostor: 0,
      palabrasVistas: []
    };
    
    set({ jugadores: [...jugadores, nuevoJugador] });
  },

  eliminarJugador: (id) => {
    set((state) => ({
      jugadores: state.jugadores.filter(j => j.id !== id)
    }));
  },

  iniciarJuego: (): boolean => {
    const { jugadores, configuracion } = get();
    
    if (jugadores.length < configuracion.numImpostores + 1) return false;
    
    const rondaIniciada = get().iniciarNuevaRonda();
    if (rondaIniciada) {
      set({ estado: 'jugando' });
      return true;
    }
    
    return false;
  },

  iniciarNuevaRonda: (): boolean => {
    const { jugadores, configuracion, palabrasUsadas, rondas } = get();
    
    if (jugadores.length === 0) return false;
    
    // Obtener palabra aleatoria
    const seleccion = configuracion.seleccionCategorias;
    const palabrasVistas = jugadores.map(j => j.palabrasVistas);
    
    const nuevaPalabra = CategoriaManager.obtenerPalabraAleatoria(
      seleccion,
      palabrasUsadas,
      palabrasVistas
    );
    
    if (!nuevaPalabra) return false;
    
    // Seleccionar impostores (simplificado)
    const numImpostores = configuracion.numImpostores;
    const jugadoresOrdenados = [...jugadores]
      .sort((a, b) => a.rondasComoImpostor - b.rondasComoImpostor);
    
    const impostoresIds = jugadoresOrdenados
      .slice(0, numImpostores)
      .map(j => j.id);
    
    // Actualizar jugadores
    const jugadoresActualizados = jugadores.map(jugador => {
      const esImpostor = impostoresIds.includes(jugador.id);
      
      return {
        ...jugador,
        rol: (esImpostor ? 'impostor' : 'tripulante') as Rol,
        palabra: esImpostor ? '' : nuevaPalabra.palabra,
        pista: esImpostor ? nuevaPalabra.pista : '',
        haVistoCarta: false,
        esActual: jugador.id === jugadores[0].id, // Primer jugador es actual
        palabrasVistas: [...jugador.palabrasVistas, nuevaPalabra.palabra],
        rondasComoImpostor: esImpostor 
          ? jugador.rondasComoImpostor + 1 
          : jugador.rondasComoImpostor
      };
    });
    
    // Crear nueva ronda
    const nuevaRonda: Ronda = {
      numero: rondas.length + 1,
      palabra: nuevaPalabra.palabra,
      pista: nuevaPalabra.pista,
      categoria: nuevaPalabra.categoria,
      subcategoria: nuevaPalabra.subcategoria,
      impostoresIds,
      completada: false
    };
    
    // CORRECCIÓN CLAVE: Actualizar estado
    set((state) => {
      const nuevaRondaIndex = state.rondas.length; // Índice de la nueva ronda
      
      return {
        jugadores: jugadoresActualizados,
        rondas: [...state.rondas, nuevaRonda],
        rondaActual: nuevaRondaIndex,
        palabraActual: nuevaPalabra.palabra,
        pistaActual: nuevaPalabra.pista,
        categoriaRondaActual: nuevaPalabra.categoria,
        subcategoriaRondaActual: nuevaPalabra.subcategoria,
        palabrasUsadas: [...state.palabrasUsadas, nuevaPalabra.palabra],
        jugadorActualIndex: 0,
        estado: 'jugando'
      };
    });
    
    return true;
  },

  siguienteJugador: () => {
    const { jugadores, jugadorActualIndex } = get();
    
    if (jugadorActualIndex >= jugadores.length - 1) {
      get().completarRonda();
      return;
    }
    
    // Desmarcar jugador actual
    const jugadorActual = jugadores[jugadorActualIndex];
    if (jugadorActual) {
      set((state) => ({
        jugadores: state.jugadores.map(j =>
          j.id === jugadorActual.id ? { ...j, esActual: false } : j
        )
      }));
    }
    
    // Marcar siguiente jugador
    const nuevoIndex = jugadorActualIndex + 1;
    const siguienteJugador = jugadores[nuevoIndex];
    
    if (siguienteJugador) {
      set((state) => ({
        jugadores: state.jugadores.map(j =>
          j.id === siguienteJugador.id ? { ...j, esActual: true } : j
        )
      }));
    }
    
    set({ jugadorActualIndex: nuevoIndex });
  },

  revelarCartaActual: () => {
    const { jugadores, jugadorActualIndex } = get();
    const jugadorActual = jugadores[jugadorActualIndex];
    
    if (!jugadorActual) return;
    
    set((state) => ({
      jugadores: state.jugadores.map(j =>
        j.id === jugadorActual.id ? { ...j, haVistoCarta: true } : j
      )
    }));
  },

  completarRonda: () => {
    const { rondas, rondaActual } = get();
    
    if (rondaActual >= 0 && rondaActual < rondas.length) {
      const rondasActualizadas = [...rondas];
      rondasActualizadas[rondaActual] = {
        ...rondasActualizadas[rondaActual],
        completada: true
      };
      
      set({ 
        rondas: rondasActualizadas,
        estado: 'revelacion'
      });
    }
  },

  reiniciarJuego: () => {
    set({
      estado: 'configuracion',
      rondas: [],
      rondaActual: -1,
      palabraActual: '',
      pistaActual: '',
      jugadorActualIndex: 0,
      palabrasUsadas: [],
      categoriaRondaActual: null,
      subcategoriaRondaActual: null
    });
    
    // Reiniciar estado de jugadores
    set((state) => ({
      jugadores: state.jugadores.map(j => ({
        ...j,
        rol: 'tripulante',
        palabra: '',
        pista: '',
        haVistoCarta: false,
        esActual: false,
        // Mantener el historial de rondas como impostor
      }))
    }));
  },

  // Getters
  getJugadorActual: () => {
    const { jugadores, jugadorActualIndex } = get();
    return jugadores[jugadorActualIndex] || null;
  },

  getImpostores: () => {
    const { jugadores } = get();
    return jugadores.filter(j => j.rol === 'impostor');
  },

  getTripulantes: () => {
    const { jugadores } = get();
    return jugadores.filter(j => j.rol === 'tripulante');
  },

  getTodosHanVisto: () => {
    const { jugadores } = get();
    return jugadores.every(j => j.haVistoCarta);
  }
}));