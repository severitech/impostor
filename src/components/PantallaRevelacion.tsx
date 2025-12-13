// components/PantallaRevelacion/PantallaRevelacion.tsx
import { useGameStoreTyped } from '@/hook/useGameStoreTyped';
import { ArrowLeft, HelpCircle, AlertTriangle, Key, RefreshCw, LogOut } from 'lucide-react';
import React, { useState } from 'react';

const PantallaRevelacion: React.FC = () => {
  const { 
    iniciarNuevaRonda,
    reiniciarJuego,
    setEstado
  } = useGameStoreTyped.useAcciones();

  const jugadores = useGameStoreTyped.useJugadores();
  const palabraActual = useGameStoreTyped.usePalabraActual();
  const pistaActual = useGameStoreTyped.usePistaActual();
  
  const [revelado, setRevelado] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const impostores = jugadores.filter(j => j.rol === 'impostor');

  const handleRevelar = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setRevelado(true);
      // Pequeño delay para asegurar que el renderizado ocurra antes de mostrar
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300); // 300ms para desvanecer
  };

  return (
      <div className="w-full flex-1 bg-gray-900 text-white flex flex-col items-center p-6 overflow-hidden">
   {/* Botón Atrás (Solo visible antes de revelar para no spoilear si se sale por error) */}
      {!revelado && (
        <button 
          onClick={() => setEstado('configuracion')}
          className="absolute left-4 top-4 p-2 hover:bg-gray-800 rounded-full transition-colors z-50"
        >
          <ArrowLeft className="w-8 h-8 text-gray-400 hover:text-white" />
        </button>
      )}

      <div className={`max-w-2xl w-full text-center space-y-8 transition-all duration-500 ease-in-out transform ${
        isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
      }`}>
        
        {!revelado ? (
          <>
            <div className="flex justify-center mb-6">
              <HelpCircle className="w-24 h-24 text-yellow-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold mb-8">¿Quién es el impostor?</h1>
            <p className="text-xl text-gray-400 mb-8">Discutan entre ustedes...</p>
            
            <button
              onClick={handleRevelar}
              className="w-full bg-red-600 hover:bg-red-700 py-6 rounded-3xl text-2xl font-bold shadow-lg transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <AlertTriangle className="w-8 h-8" />
              REVELAR IMPOSTOR
            </button>
          </>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-red-500 animate-bounce flex items-center justify-center gap-3">
              <AlertTriangle className="w-10 h-10" />
              EL IMPOSTOR ERA...
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {impostores.map(imp => (
                <div key={imp.id} className="bg-red-900/50 border-2 border-red-500 p-6 rounded-3xl animate-pulse">
                  <span className="text-3xl font-bold block mb-2">{imp.nombre}</span>
                  <span className="text-sm text-red-300 flex items-center justify-center gap-2">
                    <Key className="w-4 h-4" /> Pista: {pistaActual}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 p-6 rounded-3xl mb-8">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">La palabra secreta era</p>
              <p className="text-3xl font-bold text-blue-400">{palabraActual}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => iniciarNuevaRonda()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-4 rounded-3xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-6 h-6" />
                Siguiente Ronda
              </button>
              <button
                onClick={() => reiniciarJuego()}
                className="px-6 bg-gray-700 hover:bg-gray-600 py-4 rounded-3xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-6 h-6" />
                Salir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PantallaRevelacion;
