// data/categorias.ts

import type { CategoriaConfig } from "@/types/Juego.type";


export const CATEGORIAS_PRINCIPALES: CategoriaConfig[] = [
  {
    id: 'cultura',
    nombre: 'Cultura General',
    icono: '',
    color: 'bg-blue-500',
    subcategorias: ['paises', 'capitales', 'monumentos', 'comida', 'tradiciones'],
    activa: true
  },
  {
    id: 'arte',
    nombre: 'Arte',
    icono: '',
    color: 'bg-purple-500',
    subcategorias: ['pintura', 'escultura', 'artistas', 'tecnicas', 'movimientos'],
    activa: true
  },
  {
    id: 'entretenimiento',
    nombre: 'Entretenimiento',
    icono: '',
    color: 'bg-green-500',
    subcategorias: ['peliculas', 'musica', 'series', 'videojuegos'],
    activa: true
  },
  {
    id: 'ciencia',
    nombre: 'Ciencia',
    icono: '',
    color: 'bg-red-500',
    subcategorias: ['fisica', 'biologia', 'astronomia', 'quimica', 'matematicas'],
    activa: true
  },
  {
    id: 'deportes',
    nombre: 'Deportes',
    icono: '',
    color: 'bg-orange-500',
    subcategorias: ['futbol', 'baloncesto', 'tenis', 'otros'],
    activa: true
  },
  {
    id: 'geografia',
    nombre: 'Geografía',
    icono: '',
    color: 'bg-teal-500',
    subcategorias: ['montanas', 'rios', 'paises', 'oceanos'],
    activa: true
  },
  {
    id: 'historia',
    nombre: 'Historia',
    icono: '',
    color: 'bg-amber-600',
    subcategorias: ['personajes', 'eventos', 'guerras'],
    activa: true
  },
  {
    id: 'todas',
    nombre: 'Todas las Categorías',
    icono: '',
    color: 'bg-yellow-500',
    subcategorias: [], // Vacío significa todas las subcategorías
    activa: true
  }
];

// Mapeo de subcategorías a nombres amigables
export const NOMBRES_SUBCATEGORIAS: Record<string, string> = {

  'paises': 'Países',
  'capitales': 'Capitales',
  'monumentos': 'Monumentos',
  'comida': 'Comida Típica',
  'tradiciones': 'Tradiciones',

  'pintura': 'Pintura',
  'escultura': 'Escultura',
  'artistas': 'Artistas',
  'tecnicas': 'Técnicas',
  'movimientos': 'Movimientos Artísticos',
  
  'peliculas': 'Películas',
  'musica': 'Música',
  'series': 'Series',
  'videojuegos': 'Videojuegos',
  
  'fisica': 'Física',
  'biologia': 'Biología',
  'astronomia': 'Astronomía',
  'quimica': 'Química',
  'matematicas': 'Matemáticas',

  'futbol': 'Fútbol',
  'baloncesto': 'Baloncesto',
  'tenis': 'Tenis',
  'otros': 'Otros',

  'montanas': 'Montañas',
  'rios': 'Ríos',
  'oceanos': 'Océanos',

  'personajes': 'Personajes',
  'eventos': 'Eventos',
  'guerras': 'Guerras'
};