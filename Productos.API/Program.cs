using Microsoft.EntityFrameworkCore;
using Productos.API.Application;
using Productos.API.Application.Services;
using Productos.API.Infrastructure;
using Productos.API.Domain;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ProductosDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IProductoRepository, ProductoRepository>();
builder.Services.AddScoped<ProductoService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Productos API v1");
    });
}
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
