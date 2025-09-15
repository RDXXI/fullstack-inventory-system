using Productos.API.Application;
using Productos.API.Domain;

namespace Productos.API.Application.Services;

public class ProductoService
{
    private readonly IProductoRepository _repository;

    public ProductoService(IProductoRepository repository)
    {
        _repository = repository;
    }

    public async Task<Producto> CrearProductoAsync(string nombre, string descripcion, string categoria, string imagenUrl, decimal precio, int stock)
    {
        var producto = new Producto(nombre, descripcion, categoria, imagenUrl, precio, stock);
        await _repository.AddAsync(producto);
        return producto;
    }
    public async Task<IEnumerable<Producto>> ListarProductosAsync(
        int pageNumber,
        int pageSize,
        string? nombre = null,
        string? categoria = null)
    {
        return await _repository.GetAllAsync(pageNumber, pageSize, nombre, categoria);
    }

    public async Task<Producto?> ObtenerProductoPorIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task ActualizarProductoAsync(Producto producto)
    {
        await _repository.UpdateAsync(producto);
    }

    public async Task EliminarProductoAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}
