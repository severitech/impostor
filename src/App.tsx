import PantallaConfiguracion from "./components/PantallaConfiguracion";
import SelectorCategorias from "./components/SelectorCategorias";
import PantallaJuego from "./components/PantallaJuego";
import PantallaRevelacion from "./components/PantallaRevelacion";
import { useGameStoreTyped } from "./hook/useGameStoreTyped";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const estado = useGameStoreTyped.useEstado();

  const renderPantalla = () => {
    switch (estado) {
      case "seleccionCategoria":
        return <SelectorCategorias />;
      case "configuracion":
        return <PantallaConfiguracion />;
      case "jugando":
        return <PantallaJuego />;
      case "revelacion":
        return <PantallaRevelacion />;
      default:
        return <SelectorCategorias />;
    }
  };

  return (
    <section className="min-h-screen flex flex-col">
      <main className="flex-1 flex">{renderPantalla()}</main>
      <Footer />
    </section>
  );
};

export default App;
