import React, { useEffect, useState } from "react";
import {
  getProductos,
  deleteProducto,
  updateProducto,
  getProducto,
} from "../api/productosService";
import "./css/ProductoList.css";

export const ProductoList = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<any>(null);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const fetchProductos = async () => {
    const res = await getProductos(page);
    setProductos(res.data.items);
  };

  useEffect(() => {
    fetchProductos();
  }, [page]);

  const handleDelete = async (id: number) => {
    await deleteProducto(id);
    fetchProductos();
  };

  const openEdit = async (id: number) => {
    const res = await getProducto(id);
    const p = res.data;
    setEditing(p);
    setNombre(p.nombre);
    setPrecio(p.precio);
    setStock(p.stock);
    setDescripcion(p.descripcion);
    setCategoria(p.categoria);
    setImagenUrl(p.imagenUrl);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!editing) return;
    await updateProducto(editing.id, {
      nombre,
      precio,
      stock,
      descripcion,
      categoria,
      imagenUrl,
    });
    setEditing(null);
    fetchProductos();
  };

  return (
    <div className="producto-list-card">
      <h2>Listado de Productos</h2>

      <table className="producto-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>
                <img
                  src={p.imagenUrl}
                  alt={p.nombre}
                  className="producto-img"
                />
              </td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.categoria}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn-edit" onClick={() => openEdit(p.id)}>
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>

      {/* editar */}
      {editing && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Editar Producto</h3>
            <form onSubmit={handleUpdate}>
              <label>Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <label>Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />

              <label>Categoría</label>
              <input
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />

              <label>Imagen URL</label>
              <input
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
                required
              />

              <label>Precio</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(parseFloat(e.target.value))}
                required
              />

              <label>Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
                required
              />

              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setEditing(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
