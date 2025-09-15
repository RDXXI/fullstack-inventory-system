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
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-3">
        Listado de Transacciones
      </h2>

      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por tipo..."
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none bg-white"
        />
        <button
          onClick={fetchTransacciones}
          className="px-6 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:-translate-y-0.5"
        >
          Filtrar
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full border border-gray-200 rounded-xl">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Producto
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Cantidad
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Precio Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transacciones.length > 0 ? (
              transacciones.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3">{t.productoId}</td>
                  <td className="px-4 py-3">{t.tipo}</td>
                  <td className="px-4 py-3">{t.cantidad}</td>
                  <td className="px-4 py-3 font-semibold text-blue-700">
                    ${t.precioTotal}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No se encontraron transacciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-5 py-2 rounded-xl font-medium text-gray-700 border border-gray-300 bg-white shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ⬅ Anterior
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:-translate-y-0.5"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
};
