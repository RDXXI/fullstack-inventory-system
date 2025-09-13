import React, { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../api/productosService";

export const ProductoList = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const fetchProductos = async () => {
    const res = await getProductos(page);
    setProductos(res.data);
  };

  useEffect(() => {
    fetchProductos();
  }, [page]);

  const handleDelete = async (id: number) => {
    await deleteProducto(id);
    fetchProductos();
  };

  return (
    <div>
      <h2>Listado de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                {/* Aquí podría ir un botón para editar */}
              </td>
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
