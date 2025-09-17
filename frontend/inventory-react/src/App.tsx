import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductosPage } from "./pages/ProductosPage";
import { TransaccionesPage } from "./pages/TransaccionesPage";
import { ProductoList } from "./components/ProductoList";
import { ProductoForm } from "./components/ProductoForm";
import { TransaccionForm } from "./components/TransaccionForm";
import { TransaccionList } from "./components/TransaccionList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/ListaProductos" element={<ProductoList />} />
        <Route path="/productosItem" element={<ProductoForm />} />
        <Route path="/transacciones" element={<TransaccionesPage />} />
        <Route path="/transaccionesItem" element={<TransaccionForm />} />
        <Route path="/ListaTransacciones" element={<TransaccionList />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
