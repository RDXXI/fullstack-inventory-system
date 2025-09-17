using Transacciones.API.Domain;

namespace Transacciones.API.Application.Interfaces
{
    public interface ITransaccionRepository
    {
        Task<Transaccion> AddAsync(Transaccion transaccion);
        Task<Transaccion?> GetByIdAsync(int id);
        Task<PagedResult<Transaccion>> GetAllAsync(int pageNumber, int pageSize, string? tipo = null, int? productoId = null, DateTime? fechaDesde = null, DateTime? fechaHasta = null);
        Task<Transaccion> UpdateAsync(Transaccion transaccion);
        Task DeleteAsync(int id);
    }
}
