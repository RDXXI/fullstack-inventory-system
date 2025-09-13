import React, { useState } from "react";
import { createTransaccion } from "../api/transaccionesService";

export const TransaccionForm = ({ onSuccess }: any) => {
  const [tipo, setTipo] = useState("");
  const [productoId, setProductoId] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [detalle, setDetalle] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createTransaccion({
      tipo,
      productoId,
      cantidad,
      precioUnitario,
      detalle,
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ProductoId"
        value={productoId}
        onChange={(e) => setProductoId(parseInt(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Precio Unitario"
        value={precioUnitario}
        onChange={(e) => setPrecioUnitario(parseFloat(e.target.value))}
        required
      />
      <input
        placeholder="Detalle"
        value={detalle}
        onChange={(e) => setDetalle(e.target.value)}
      />
      <button type="submit">Crear Transacción</button>
    </form>
  );
};
