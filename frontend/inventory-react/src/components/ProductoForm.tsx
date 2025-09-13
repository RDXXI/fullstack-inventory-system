import React, { useState, useEffect } from "react";
import {
  createProducto,
  updateProducto,
  getProducto,
} from "../api/productosService";

export const ProductoForm = ({ productoId, onSuccess }: any) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (productoId) {
      getProducto(productoId).then((res) => {
        const p = res.data;
        setNombre(p.nombre);
        setPrecio(p.precio);
        setStock(p.stock);
      });
    }
  }, [productoId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = { nombre, precio, stock };
    if (productoId) await updateProducto(productoId, data);
    else await createProducto(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(parseFloat(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
        required
      />
      <button type="submit">{productoId ? "Actualizar" : "Crear"}</button>
    </form>
  );
};
