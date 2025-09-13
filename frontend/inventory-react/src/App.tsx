import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductosPage } from "./pages/ProductosPage";
import { TransaccionesPage } from "./pages/TransaccionesPage";
// import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta inicial */}
        {/* <Route path="/" element={<Home />} /> */}

        {/* Rutas de productos y transacciones */}
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/transacciones" element={<TransaccionesPage />} />

        {/* Ruta 404 opcional */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
