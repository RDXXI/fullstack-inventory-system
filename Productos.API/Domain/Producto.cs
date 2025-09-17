namespace Productos.API.Domain;

public class Producto
{
    public int Id { get; private set; }
    public string Nombre { get; private set; } = null!;
    public string Descripcion { get; private set; } = null!;
    public string Categoria { get; private set; } = null!;
    public string ImagenUrl { get; private set; } = null!;
    public decimal Precio { get; private set; }
    public int Stock { get; private set; }

    public Producto(string nombre, string descripcion, string categoria, string imagenUrl, decimal precio, int stock)
    {
        Nombre = nombre;
        Descripcion = descripcion;
        Categoria = categoria;
        ImagenUrl = imagenUrl;
        Precio = precio;
        Stock = stock;
    }

    public void AjustarStock(int cantidad)
    {
        if (Stock + cantidad < 0)
            throw new InvalidOperationException("Stock insuficiente");
        Stock += cantidad;
    }

    public void ActualizarProducto(int id, string nombre, string descripcion, string categoria, string imagenUrl, decimal precio)
    {
        Id = id;
        Nombre = nombre;
        Descripcion = descripcion;
        Categoria = categoria;
        ImagenUrl = imagenUrl;
        Precio = precio;
    }
}
