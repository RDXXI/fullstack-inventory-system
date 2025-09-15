import React, { useState } from "react";
import { createTransaccion } from "../api/transaccionesService";

interface TransaccionFormProps {
  onSuccess: () => void;
}

export const TransaccionForm: React.FC<TransaccionFormProps> = ({
  onSuccess,
}) => {
  const [tipo, setTipo] = useState("");
  const [productoId, setProductoId] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [detalle, setDetalle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTransaccion({
      tipo,
      productoId,
      cantidad,
      precioUnitario,
      detalle,
    });
    onSuccess();
    setTipo("");
    setProductoId(0);
    setCantidad(0);
    setPrecioUnitario(0);
    setDetalle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl shadow-2xl space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">
        Nueva Transacción
      </h2>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Tipo de Transacción
        </label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        >
          <option value="" disabled>
            Selecciona Tipo
          </option>
          <option value="Compra">Compra</option>
          <option value="Venta">Venta</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          ID del Producto
        </label>
        <input
          type="number"
          value={productoId}
          onChange={(e) => setProductoId(parseInt(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Cantidad
        </label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Precio Unitario
        </label>
        <input
          type="number"
          value={precioUnitario}
          onChange={(e) => setPrecioUnitario(parseFloat(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Detalle (Opcional)
        </label>
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        Crear Transacción
      </button>
    </form>
  );
};
