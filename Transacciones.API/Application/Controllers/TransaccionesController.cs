using Microsoft.AspNetCore.Mvc;
using Transacciones.API.Application.DTOs;
using Transacciones.API.Application.Services;
using Transacciones.API.Domain;

namespace Transacciones.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransaccionesController : ControllerBase
    {
        private readonly TransaccionService _service;

        public TransaccionesController(TransaccionService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<Transaccion>> CrearTransaccion([FromBody] Transaccion dto)
        {
            var transaccion = await _service.CrearTransaccionAsync(dto);
            return CreatedAtAction(nameof(ObtenerPorId), new { id = transaccion.Id }, transaccion);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transaccion>> ObtenerPorId(int id)
        {
            var transaccion = await _service.ObtenerPorIdAsync(id);
            if (transaccion == null) return NotFound();
            return Ok(transaccion);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaccion>>> ListarTransacciones(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? tipo = null,
            [FromQuery] int? productoId = null,
            [FromQuery] DateTime? fechaDesde = null,
            [FromQuery] DateTime? fechaHasta = null
        )
        {
            var result = await _service.ListarTransaccionesAsync(pageNumber, pageSize, tipo, productoId, fechaDesde, fechaHasta);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Transaccion>> ActualizarTransaccion(int id, [FromBody] Transaccion dto)
        {
            if (id != dto.Id)
                return BadRequest("El ID de la ruta no coincide con el ID de la transacción.");

            var actualizada = await _service.ActualizarTransaccionAsync(dto);
            if (actualizada == null)
                return NotFound();

            return Ok(actualizada);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarTransaccion(int id)
        {
            var eliminada = await _service.EliminarTransaccionAsync(id);
            if (!eliminada)
                return NotFound();

            return NoContent();
        }
    }
}
