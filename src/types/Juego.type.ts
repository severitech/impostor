// types/gameTypes.ts

// Tipos de categorías principales
export type CategoriaPrincipal = 'cultura' | 'arte' | 'entretenimiento' | 'ciencia' | 'deportes' | 'geografia' | 'historia' | 'todas';

// Subcategorías (pueden expandirse)
export type SubcategoriaCultura = 'paises' | 'capitales' | 'monumentos' | 'comida' | 'tradiciones';
export type SubcategoriaArte = 'pintura' | 'escultura' | 'artistas' | 'tecnicas' | 'movimientos';
export type SubcategoriaEntretenimiento = 'peliculas' | 'musica' | 'series' | 'videojuegos';
export type SubcategoriaCiencia = 'fisica' | 'biologia' | 'astronomia' | 'quimica' | 'matematicas';
export type SubcategoriaDeportes = 'futbol' | 'baloncesto' | 'tenis' | 'otros';
export type SubcategoriaGeografia = 'montanas' | 'rios' | 'paises' | 'oceanos';
export type SubcategoriaHistoria = 'personajes' | 'eventos' | 'guerras';

// Unión de todas las subcategorías
export type Subcategoria = 
  | SubcategoriaCultura 
  | SubcategoriaArte 
  | SubcategoriaEntretenimiento 
  | SubcategoriaCiencia
  | SubcategoriaDeportes
  | SubcategoriaGeografia
  | SubcategoriaHistoria;

export interface CategoriaConfig {
  id: CategoriaPrincipal;
  nombre: string;
  icono: string;
  color: string;
  subcategorias: Subcategoria[];
  activa: boolean;
}

export interface SeleccionCategorias {
  categorias: CategoriaPrincipal[]; // Array de categorías seleccionadas
  subcategorias: Subcategoria[]; // Array vacío = todas las subcategorías
  modoMezclado: boolean; // Si se mezclan diferentes categorías
}

export type Rol = 'tripulante' | 'impostor';
export type EstadoJuego = 'seleccionCategoria' | 'configuracion' | 'jugando' | 'revelacion' | 'entreRondas' | 'finalizado';

export interface Jugador {
  id: string;
  nombre: string;
  rol: Rol;
  palabra: string;
  pista: string;
  haVistoCarta: boolean;
  esActual: boolean;
  rondasComoImpostor: number;
  palabrasVistas: string[];
}

export interface Ronda {
  numero: number;
  palabra: string;
  pista: string;
  categoria: CategoriaPrincipal;
  subcategoria: Subcategoria;
  impostoresIds: string[];
  completada: boolean;
}

export interface Configuracion {
  numImpostores: 1 | 2 | 3;
  seleccionCategorias: SeleccionCategorias;
  tiempoTurno: number | null;
  maxRondas: number;
  dificultad: 'facil' | 'dificil';
}

export interface DatosJuego {
  id: string;
  palabra: string;
  pista: string;
  categoria: CategoriaPrincipal;
  subcategoria: Subcategoria;
  dificultad: 'facil' | 'medio' | 'dificil';
}