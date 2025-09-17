import React, { useEffect, useState } from "react";
import { getTransacciones } from "../api/transaccionesService";
import "./css/TransaccionList.css";

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
    setTransacciones(res.data.items);
  };

  useEffect(() => {
    fetchTransacciones();
  }, [page, tipo]);

  return (
    <div className="container">
      <h2 className="title">Listado de Transacciones</h2>

      <div className="filter">
        <input
          type="text"
          placeholder="Buscar por tipo..."
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="input"
        />
        <button onClick={fetchTransacciones} className="btn-filter">
          Filtrar
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Precio Total</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.length > 0 ? (
              transacciones.map((t) => (
                <tr key={t.id} className="table-row">
                  <td>{t.productoId}</td>
                  <td>{t.tipo}</td>
                  <td>{t.cantidad}</td>
                  <td>${t.precioUnitario}</td>
                  <td className="precio-total">${t.precioTotal}</td>
                  <td>{t.detalle}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="empty">
                  No se encontraron transacciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="btn-page"
        >
          Anterior
        </button>
        <button onClick={() => setPage(page + 1)} className="btn-page btn-next">
          Siguiente
        </button>
      </div>
    </div>
  );
};
