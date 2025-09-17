import React, { useState, useEffect } from "react";
import {
  createProducto,
  updateProducto,
  getProducto,
} from "../api/productosService";
import "./css/ProductoList.css";

interface ProductoFormProps {
  productoId?: number;
  onSuccess: () => void;
}

export const ProductoForm: React.FC<ProductoFormProps> = ({
  productoId,
  onSuccess,
}) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (productoId) {
      getProducto(productoId).then((res) => {
        const p = res.data;
        setNombre(p.nombre);
        setPrecio(p.precio);
        setStock(p.stock);
        setDescripcion(p.descripcion);
        setCategoria(p.categoria);
        setImagenUrl(p.imagenUrl);
      });
    }
  }, [productoId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = { nombre, precio, stock, descripcion, categoria, imagenUrl };

    try {
      if (productoId) await updateProducto(productoId, data);
      else await createProducto(data);

      setMensaje(
        `Producto ${productoId ? "actualizado" : "creado"} correctamente`
      );

      if (!productoId) {
        setNombre("");
        setPrecio(0);
        setStock(0);
        setDescripcion("");
        setCategoria("");
        setImagenUrl("");
      }

      onSuccess();

      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error guardando producto:", error);
      setMensaje("Error al guardar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="producto-form">
      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      <label>Nombre</label>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        placeholder="Nombre del producto"
      />

      <label>Descripción</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
        placeholder="Descripción del producto"
      />

      <label>Categoría</label>
      <input
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
        placeholder="Categoría"
      />

      <label>Imagen URL</label>
      <input
        value={imagenUrl}
        onChange={(e) => setImagenUrl(e.target.value)}
        required
        placeholder="URL de la imagen"
      />

      <label>Precio</label>
      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(parseFloat(e.target.value))}
        required
        placeholder="Precio"
      />

      <label>Stock</label>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
        required
        placeholder="Stock"
      />

      <button type="submit" className="btn-submit">
        {productoId ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};
