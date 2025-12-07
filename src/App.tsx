import PantallaConfiguracion from "./components/PantallaConfiguracion";
import SelectorCategorias from "./components/SelectorCategorias";
import PantallaJuego from "./components/PantallaJuego";
import PantallaRevelacion from "./components/PantallaRevelacion";
import { useGameStoreTyped } from "./hook/useGameStoreTyped";

const App: React.FC = () => {
  const estado = useGameStoreTyped.useEstado();

  const renderPantalla = () => {
    switch (estado) {
      case 'seleccionCategoria':
        return <SelectorCategorias />;
      case 'configuracion':
        return <PantallaConfiguracion />;
      case 'jugando':
        return <PantallaJuego />;
      case 'revelacion':
        return <PantallaRevelacion />;
      default:
        return <SelectorCategorias />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main>
        {renderPantalla()}
      </main>
    </div>
  );
};

export default App;