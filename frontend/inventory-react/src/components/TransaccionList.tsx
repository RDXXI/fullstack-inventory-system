import React, { useEffect, useState } from "react";
import { getTransacciones } from "../api/transaccionesService";

export const TransaccionList = () => {
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [tipo, setTipo] = useState("");

  const fetchTransacciones = async () => {
    const res = await getTransacciones({
      pageNumber: page,
      pageSize: 10,
      tipo,
    });
    setTransacciones(res.data);
  };

  useEffect(() => {
    fetchTransacciones();
  }, [page, tipo]);

  return (
    <div>
      <h2>Listado de Transacciones</h2>
      <input
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <button onClick={fetchTransacciones}>Filtrar</button>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map((t) => (
            <tr key={t.id}>
              <td>{t.productoId}</td>
              <td>{t.tipo}</td>
              <td>{t.cantidad}</td>
              <td>{t.precioTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <button onClick={() => setPage(page + 1)}>Siguiente</button>
    </div>
  );
};
