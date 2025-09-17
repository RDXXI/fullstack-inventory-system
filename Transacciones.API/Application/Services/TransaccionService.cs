using System.Net.Http;
using System.Text.Json;
using Transacciones.API.Application.Interfaces;
using Transacciones.API.Domain;

namespace Transacciones.API.Application.Services
{
    public class TransaccionService
    {
        private readonly ITransaccionRepository _repository;
        private readonly HttpClient _httpClient;

        public TransaccionService(ITransaccionRepository repository)
        {
            _repository = repository;
            _httpClient = new HttpClient();
        }

        private async Task<bool> ValidarProductoExisteAsync(int productoId)
        {
            var url = $"http://localhost:5001/api/Productos/{productoId}";
            try
            {
                var response = await _httpClient.GetAsync(url);
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        public async Task<Transaccion> CrearTransaccionAsync(Transaccion dto)
        {
            if (!await ValidarProductoExisteAsync(dto.ProductoId))
                throw new ArgumentException($"El producto con ID {dto.ProductoId} no existe.");

            var transaccion = new Transaccion(dto.ProductoId, dto.Tipo, dto.Cantidad, dto.PrecioUnitario, dto.Detalle);
            return await _repository.AddAsync(transaccion);
        }

        public async Task<PagedResult<Transaccion>> ListarTransaccionesAsync(
            int pageNumber, int pageSize,
            string? tipo = null,
            int? productoId = null,
            DateTime? desde = null,
            DateTime? hasta = null)
        {
            return await _repository.GetAllAsync(pageNumber, pageSize, tipo, productoId, desde, hasta);
        }

        public async Task<Transaccion?> ObtenerPorIdAsync(int id) =>
            await _repository.GetByIdAsync(id);

        public async Task<Transaccion?> ActualizarTransaccionAsync(Transaccion dto)
        {
            var existente = await _repository.GetByIdAsync(dto.Id);
            if (existente == null)
                return null;

            if (!await ValidarProductoExisteAsync(dto.ProductoId))
                throw new ArgumentException($"El producto con ID {dto.ProductoId} no existe.");

            existente.Actualizar(dto.ProductoId, dto.Tipo, dto.Cantidad, dto.PrecioUnitario, dto.Detalle);
            return await _repository.UpdateAsync(existente);
        }

        public async Task<bool> EliminarTransaccionAsync(int id)
        {
            var existente = await _repository.GetByIdAsync(id);
            if (existente == null)
                return false;

            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
