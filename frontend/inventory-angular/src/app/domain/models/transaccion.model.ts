export interface Transaccion {
  id?: number;
  fecha?: string;
  tipo?: 'Compra' | 'Venta' | string;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  precioTotal?: number;
  detalle?: string;
}
