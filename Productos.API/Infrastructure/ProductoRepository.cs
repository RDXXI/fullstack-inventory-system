using Microsoft.EntityFrameworkCore;
using Productos.API.Application;
using Productos.API.Domain;

namespace Productos.API.Infrastructure;

public class ProductoRepository : IProductoRepository
{
    private readonly ProductosDbContext _context;
    public ProductoRepository(ProductosDbContext context) => _context = context;

    public async Task AddAsync(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var p = await _context.Productos.FindAsync(id);
        if (p != null)
        {
            _context.Productos.Remove(p);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<PagedResult<Producto>> GetAllAsync(
        int pageNumber,
        int pageSize,
        string? nombre = null,
        string? categoria = null)
    {
        var query = _context.Productos.AsQueryable();

        if (!string.IsNullOrEmpty(nombre))
            query = query.Where(p => p.Nombre.Contains(nombre));

        if (!string.IsNullOrEmpty(categoria))
            query = query.Where(p => p.Categoria == categoria);

        query = query.OrderBy(p => p.Nombre);

        var totalItems = await query.CountAsync();

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Producto>
        {
            Items = items,
            TotalItems = totalItems
        };
    }


    public async Task<Producto?> GetByIdAsync(int id) => await _context.Productos.FindAsync(id);

    public async Task UpdateAsync(Producto producto)
    {
        _context.Entry(producto).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Producto>> GetAllForComboAsync(string? nombre = null)
    {
        var query = _context.Productos.AsQueryable();

        if (!string.IsNullOrEmpty(nombre))
            query = query.Where(p => p.Nombre.Contains(nombre));

        return await query
            .OrderBy(p => p.Nombre)
            .ToListAsync();
    }

}
