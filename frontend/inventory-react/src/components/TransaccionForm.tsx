import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import type { SingleValue } from "react-select";
import { createTransaccion } from "../api/transaccionesService";
import { searchProductos } from "../api/productosService";
import type { ProductoOption } from "../api/productosService";

import "./css/TransaccionList.css";

interface TransaccionFormProps {
  onSuccess: () => void;
}

export const TransaccionForm: React.FC<TransaccionFormProps> = ({
  onSuccess,
}) => {
  const [tipo, setTipo] = useState("");
  const [producto, setProducto] = useState<ProductoOption | null>(null);
  const [cantidad, setCantidad] = useState(0);
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [detalle, setDetalle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!producto) return alert("Selecciona un producto");

    await createTransaccion({
      tipo,
      productoId: producto.value,
      cantidad,
      precioUnitario,
      detalle,
    });

    onSuccess();
    setTipo("");
    setProducto(null);
    setCantidad(0);
    setPrecioUnitario(0);
    setDetalle("");
  };

  const loadOptions = async (inputValue: string) => {
    if (!inputValue) return [];
    return await searchProductos(inputValue);
  };

  const customOption = ({ data }: any) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {data.imagenUrl && (
        <img
          src={data.imagenUrl}
          alt={data.label}
          style={{ width: 30, height: 30, borderRadius: 4 }}
        />
      )}
      <span>{data.label}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Nueva Transacción</h2>

      <div className="form-group">
        <label>Tipo de Transacción</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
          className="form-input"
        >
          <option value="" disabled>
            Selecciona Tipo
          </option>
          <option value="Compra">Compra</option>
          <option value="Venta">Venta</option>
        </select>
      </div>

      <div className="form-group">
        <label>Producto</label>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          value={producto}
          onChange={(selected: SingleValue<ProductoOption>) =>
            setProducto(selected)
          }
          placeholder="Busca un producto..."
          components={{ Option: customOption }}
          isClearable
        />
      </div>

      <div className="form-group">
        <label>Cantidad</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Precio Unitario</label>
        <input
          type="number"
          value={precioUnitario}
          onChange={(e) => setPrecioUnitario(parseFloat(e.target.value))}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Detalle (Opcional)</label>
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          rows={3}
          className="form-input textarea"
        />
      </div>

      <button type="submit" className="btn-submit">
        Crear Transacción
      </button>
    </form>
  );
};
