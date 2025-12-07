// utils/categoriaManager.ts

import { CATEGORIAS_PRINCIPALES, NOMBRES_SUBCATEGORIAS } from "@/data/Categorias";
import { datosCulturaGeneral } from "@/server/data/CulturaGeneral";
import { datosCiencia } from "@/server/data/Ciencia";
import { datosDeportes } from "@/server/data/Deportes";
import { datosEntretenimiento } from "@/server/data/Entretenimiento";
import { datosGeografia } from "@/server/data/Geografia";
import { datosHistoria } from "@/server/data/Historia";
import type { CategoriaPrincipal, DatosJuego, SeleccionCategorias, Subcategoria } from "@/types/Juego.type";



// Combinar todos los datos con estructura completa
const TODOS_LOS_DATOS: DatosJuego[] = [
  // Cultura
  ...datosCulturaGeneral.map((d, i) => ({
    ...d,
    categoria: 'cultura' as CategoriaPrincipal,
    subcategoria: obtenerSubcategoriaCultura(i),
    dificultad: calcularDificultad(d.palabra)
  })),
  
  // Ciencia
  ...datosCiencia.map((d, i) => ({
    ...d,
    categoria: 'ciencia' as CategoriaPrincipal,
    subcategoria: obtenerSubcategoriaCiencia(i),
    dificultad: calcularDificultad(d.palabra)
  })),

  // Deportes
  ...datosDeportes.map((d, i) => ({
    ...d,
    categoria: 'deportes' as CategoriaPrincipal,
    subcategoria: obtenerSubcategoriaDeportes(i),
    dificultad: calcularDificultad(d.palabra)
  })),

  // Entretenimiento
  ...datosEntretenimiento.map((d, i) => ({
    ...d,
    categoria: 'entretenimiento' as CategoriaPrincipal,
    subcategoria: obtenerSubcategoriaEntretenimiento(i),
    dificultad: calcularDificultad(d.palabra)
  })),

  // Geografia
  ...datosGeografia.map((d, i) => ({
    ...d,
    categoria: 'geografia' as CategoriaPrincipal,
    subcategoria: obtenerSubcategoriaGeografia(i),
    dificultad: calcularDificultad(d.palabra)
  })),

  // Historia
  ...datosHistoria.map((d, i) => ({
    ...d,
    categoria: 'historia' as CategoriaPrincipal,
    subcategoria: obtenerSubcategoriaHistoria(i),
    dificultad: calcularDificultad(d.palabra)
  }))
];

// Funciones auxiliares para asignar subcategorías
function obtenerSubcategoriaCultura(index: number): Subcategoria {
  const subcategorias: Subcategoria[] = ['paises', 'capitales', 'monumentos', 'comida', 'tradiciones'];
  return subcategorias[index % subcategorias.length];
}

function obtenerSubcategoriaCiencia(index: number): Subcategoria {
  const subcategorias: Subcategoria[] = ['fisica', 'biologia', 'astronomia', 'quimica', 'matematicas'];
  return subcategorias[index % subcategorias.length];
}

function obtenerSubcategoriaDeportes(index: number): Subcategoria {
  const subcategorias: Subcategoria[] = ['futbol', 'baloncesto', 'tenis', 'otros'];
  return subcategorias[index % subcategorias.length];
}

function obtenerSubcategoriaEntretenimiento(index: number): Subcategoria {
  const subcategorias: Subcategoria[] = ['peliculas', 'musica', 'series', 'videojuegos'];
  return subcategorias[index % subcategorias.length];
}

function obtenerSubcategoriaGeografia(index: number): Subcategoria {
  const subcategorias: Subcategoria[] = ['montanas', 'rios', 'paises', 'oceanos'];
  return subcategorias[index % subcategorias.length];
}

function obtenerSubcategoriaHistoria(index: number): Subcategoria {
  const subcategorias: Subcategoria[] = ['personajes', 'eventos', 'guerras'];
  return subcategorias[index % subcategorias.length];
}

function calcularDificultad(palabra: string): 'facil' | 'medio' | 'dificil' {
  const longitud = palabra.length;
  if (longitud <= 6) return 'facil';
  if (longitud <= 10) return 'medio';
  return 'dificil';
}

// Funciones principales del manager
export class CategoriaManager {
  static obtenerCategoriasDisponibles() {
    return CATEGORIAS_PRINCIPALES;
  }

  static obtenerSubcategorias(categoriaId: CategoriaPrincipal): Subcategoria[] {
    if (categoriaId === 'todas') {
      // Obtener todas las subcategorías únicas
      const todasSubcategorias = new Set<Subcategoria>();
      CATEGORIAS_PRINCIPALES
        .filter(cat => cat.id !== 'todas')
        .forEach(cat => {
          cat.subcategorias.forEach(sub => todasSubcategorias.add(sub));
        });
      return Array.from(todasSubcategorias);
    }
    
    const categoria = CATEGORIAS_PRINCIPALES.find(cat => cat.id === categoriaId);
    return categoria?.subcategorias || [];
  }

  static obtenerNombreSubcategoria(subcategoria: Subcategoria): string {
    return NOMBRES_SUBCATEGORIAS[subcategoria] || subcategoria;
  }

  static filtrarDatosPorSeleccion(
    seleccion: SeleccionCategorias,
    palabrasUsadas: string[] = []
  ): DatosJuego[] {
    let datosFiltrados = TODOS_LOS_DATOS;

    // Filtrar por categorías seleccionadas
    // Si incluye 'todas' o está vacío, no filtramos por categoría (usamos todas)
    if (seleccion.categorias.length > 0 && !seleccion.categorias.includes('todas')) {
      datosFiltrados = datosFiltrados.filter(d => seleccion.categorias.includes(d.categoria));
    }

    // Filtrar por subcategorías específicas si se seleccionaron
    if (seleccion.subcategorias.length > 0) {
      datosFiltrados = datosFiltrados.filter(d => 
        seleccion.subcategorias.includes(d.subcategoria)
      );
    }

    // Excluir palabras ya usadas
    if (palabrasUsadas.length > 0) {
      datosFiltrados = datosFiltrados.filter(d => !palabrasUsadas.includes(d.palabra));
    }

    return datosFiltrados;
  }

  static obtenerPalabraAleatoria(
    seleccion: SeleccionCategorias,
    palabrasUsadas: string[],
    jugadoresPalabrasVistas: string[][]
  ): DatosJuego | null {
    const datosDisponibles = this.filtrarDatosPorSeleccion(seleccion, palabrasUsadas);
    
    if (datosDisponibles.length === 0) {
      // Si no hay datos disponibles con las palabras usadas, intentar sin filtrar
      const todosDatos = this.filtrarDatosPorSeleccion(seleccion, []);
      if (todosDatos.length === 0) return null;
      
      // Seleccionar una palabra que haya sido vista menos veces
      const palabrasConConteo = todosDatos.map(dato => {
        const vecesVista = jugadoresPalabrasVistas.reduce((count, palabrasJugador) => 
          count + (palabrasJugador.includes(dato.palabra) ? 1 : 0), 0
        );
        return { dato, vecesVista };
      });

      // Ordenar por menos veces vista
      palabrasConConteo.sort((a, b) => a.vecesVista - b.vecesVista);
      
      // Tomar de las menos vistas (primer 30%)
      const indice = Math.floor(Math.random() * Math.min(3, palabrasConConteo.length));
      return palabrasConConteo[indice]?.dato || null;
    }

    // Seleccionar aleatoriamente de las disponibles
    const indiceAleatorio = Math.floor(Math.random() * datosDisponibles.length);
    return datosDisponibles[indiceAleatorio];
  }

  static obtenerEstadisticasCategorias() {
    const stats: Record<CategoriaPrincipal, number> = {
      'cultura': 0,
      'arte': 0,
      'entretenimiento': 0,
      'ciencia': 0,
      'deportes': 0,
      'geografia': 0,
      'historia': 0,
      'todas': 0
    };

    TODOS_LOS_DATOS.forEach(dato => {
      stats[dato.categoria]++;
      stats['todas']++;
    });

    return stats;
  }
}