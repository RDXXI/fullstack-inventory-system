using Microsoft.AspNetCore.Mvc;
using Productos.API.Application.Services;
using Productos.API.Domain;

namespace Productos.API.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly ProductoService _service;

    public ProductosController(ProductoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producto>>> Get()
    {
        var productos = await _service.ListarProductosAsync();
        return Ok(productos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Producto>> Get(int id)
    {
        var producto = await _service.ObtenerProductoPorIdAsync(id);
        return producto == null ? NotFound() : Ok(producto);
    }

    [HttpPost]
    public async Task<ActionResult<Producto>> Post([FromBody] Producto producto)
    {
        var creado = await _service.CrearProductoAsync(producto.Nombre, producto.Descripcion, producto.Categoria,
                                                      producto.ImagenUrl, producto.Precio, producto.Stock);
        return CreatedAtAction(nameof(Get), new { id = creado.Id }, creado);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Producto producto)
    {
        if (id != producto.Id) return BadRequest();
        await _service.ActualizarProductoAsync(producto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.EliminarProductoAsync(id);
        return NoContent();
    }
}
