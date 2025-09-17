namespace Transacciones.API.Domain
{
    public class Transaccion
    {
        public int Id { get; private set; }
        public DateTime Fecha { get; private set; } = DateTime.UtcNow;
        public string Tipo { get; private set; } = null!;
        public int ProductoId { get; private set; }
        public int Cantidad { get; private set; }
        public decimal PrecioUnitario { get; private set; }
        public decimal PrecioTotal { get; private set; }
        public string? Detalle { get; private set; }

        public Transaccion(int productoId, string tipo, int cantidad, decimal precioUnitario, string? detalle = null)
        {
            if (cantidad <= 0) throw new ArgumentException("Cantidad debe ser mayor que cero.");
            if (precioUnitario <= 0) throw new ArgumentException("Precio unitario debe ser mayor que cero.");
            if (tipo != "Compra" && tipo != "Venta") throw new ArgumentException("Tipo debe ser 'Compra' o 'Venta'.");

            ProductoId = productoId;
            Tipo = tipo;
            Cantidad = cantidad;
            PrecioUnitario = precioUnitario;
            PrecioTotal = cantidad * precioUnitario;
            Detalle = detalle;
        }

        public void Actualizar(int productoId, string tipo, int cantidad, decimal precioUnitario, string? detalle = null)
        {
            if (cantidad <= 0) throw new ArgumentException("Cantidad debe ser mayor que cero.");
            if (precioUnitario <= 0) throw new ArgumentException("Precio unitario debe ser mayor que cero.");
            if (tipo != "Compra" && tipo != "Venta") throw new ArgumentException("Tipo debe ser 'Compra' o 'Venta'.");

            ProductoId = productoId;
            Tipo = tipo;
            Cantidad = cantidad;
            PrecioUnitario = precioUnitario;
            PrecioTotal = cantidad * precioUnitario;
            Detalle = detalle;
        }
    }
}
