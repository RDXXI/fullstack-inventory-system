using Productos.API.Domain;

namespace Productos.API.Application;

public interface IProductoRepository
{
    Task<Producto?> GetByIdAsync(int id);
    Task<PagedResult<Producto>> GetAllAsync(
           int pageNumber,
           int pageSize,
           string? nombre = null,
           string? categoria = null
       );

    Task AddAsync(Producto producto);
    Task UpdateAsync(Producto producto);
    Task DeleteAsync(int id);
    Task<IEnumerable<Producto>> GetAllForComboAsync(string? nombre = null);
}
