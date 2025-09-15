import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductosPage } from "./pages/ProductosPage";
import { TransaccionesPage } from "./pages/TransaccionesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/transacciones" element={<TransaccionesPage />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
