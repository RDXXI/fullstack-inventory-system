import React from "react";
import { TransaccionList } from "../components/TransaccionList";
import { TransaccionForm } from "../components/TransaccionForm";

export const TransaccionesPage = () => {
  return (
    <div>
      <TransaccionForm onSuccess={() => console.log("Transacción creada")} />
      <TransaccionList />
    </div>
  );
};
