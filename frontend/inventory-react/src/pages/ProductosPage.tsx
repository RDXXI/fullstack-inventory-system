import React, { useState } from "react";
import { ProductoList } from "../components/ProductoList";
import { ProductoForm } from "../components/ProductoForm";

export const ProductosPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div>
      <ProductoForm
        productoId={selectedId}
        onSuccess={() => setSelectedId(null)}
      />
      <ProductoList />
    </div>
  );
};
