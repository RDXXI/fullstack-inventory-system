using Microsoft.EntityFrameworkCore;
using Transacciones.API.Application.Interfaces;
using Transacciones.API.Domain;

namespace Transacciones.API.Infrastructure
{
    public class TransaccionRepository : ITransaccionRepository
    {
        private readonly TransaccionesDbContext _context;

        public TransaccionRepository(TransaccionesDbContext context)
        {
            _context = context;
        }

        public async Task<Transaccion> AddAsync(Transaccion transaccion)
        {
            _context.Transacciones.Add(transaccion);
            await _context.SaveChangesAsync();
            return transaccion;
        }

        public async Task DeleteAsync(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);
            if (transaccion == null) return;

            _context.Transacciones.Remove(transaccion);
            await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<Transaccion>> GetAllAsync(
            int pageNumber,
            int pageSize,
            string? tipo = null,
            int? productoId = null,
            DateTime? fechaDesde = null,
            DateTime? fechaHasta = null)
        {
            var query = _context.Transacciones.AsQueryable();

            if (!string.IsNullOrEmpty(tipo))
                query = query.Where(t => t.Tipo == tipo);

            if (productoId.HasValue)
                query = query.Where(t => t.ProductoId == productoId.Value);

            if (fechaDesde.HasValue)
                query = query.Where(t => t.Fecha >= fechaDesde.Value);

            if (fechaHasta.HasValue)
                query = query.Where(t => t.Fecha <= fechaHasta.Value);

            var totalItems = await query.CountAsync();

            var items = await query
                .OrderByDescending(t => t.Fecha)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<Transaccion>
            {
                Items = items,
                TotalItems = totalItems
            };
        }

        public async Task<Transaccion?> GetByIdAsync(int id)
        {
            return await _context.Transacciones.FindAsync(id);
        }

        public async Task<Transaccion> UpdateAsync(Transaccion transaccion)
        {
            var transaccions = await _context.Transacciones.FindAsync(transaccion.Id);
            if (transaccions == null)
                return null;

            _context.Transacciones.Update(transaccion);
            await _context.SaveChangesAsync();
            return transaccion;
        }


    }
}
