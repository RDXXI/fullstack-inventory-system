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
    public async Task<ActionResult<IEnumerable<Producto>>> Get(
     [FromQuery] int pageNumber = 1,
     [FromQuery] int pageSize = 10,
     [FromQuery] string? nombre = null,
     [FromQuery] string? categoria = null)
    {
        var productos = await _service.ListarProductosAsync(pageNumber, pageSize, nombre, categoria);
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
        producto.ActualizarProducto(id, producto.Nombre, producto.Descripcion, producto.Categoria, producto.ImagenUrl, producto.Precio);
        await _service.ActualizarProductoAsync(producto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.EliminarProductoAsync(id);
        return NoContent();
    }

    [HttpGet("cmbSearch")]
    public async Task<IActionResult> GetSearch([FromQuery] string search = "")
    {
        var productos = await _service.ListarProductosComboAsync(search);
        return Ok(productos);
    }
}
