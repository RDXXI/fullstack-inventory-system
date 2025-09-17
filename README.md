# fullstack-inventory-system

## Fullstack Inventory Management App | .NET Microservices + React + SQL

# Sistema de Gestión de Inventario

Evaluación técnica para el puesto de Desarrollador Full Stack.

Esta aplicación implementa una arquitectura de microservicios en .NET Core para el backend y Angular, React para el frontend, usando SQL Server como base de datos.
Permite la gestión de productos y transacciones de compras y ventas, con validación de stock, paginación, filtros dinámicos y una interfaz web moderna y responsiva.

---

## 💻 Frontends Disponibles

Este proyecto incluye dos implementaciones de frontend que consumen los mismos microservicios:

| Framework | Carpeta                       | Comando de ejecución |
| --------- | ----------------------------- | -------------------- |
| React     | `/frontend/inventory-react`   | `npm run dev`        |
| Angular   | `/frontend/inventory-angular` | `ng serve`           |

## 💻 Backends Disponibles

| Microservicio     | Carpeta              | Comando de ejecución | Descripción                                              |
| ----------------- | -------------------- | -------------------- | -------------------------------------------------------- |
| Productos.API     | `/Productos.API`     | `dotnet run`         | CRUD de productos y gestión de stock                     |
| Transacciones.API | `/Transacciones.API` | `dotnet run`         | Registro de compras/ventas, validación y ajuste de stock |
| Shared            | `/Shared`            | N/A                  | Clases comunes y DTOs compartidos                        |

## ⚙️ Configuración de la Base de Datos

1. Crear dos bases de datos vacía en SQL Server para inventario y producto ejemplo: InventarioDB, ProductosDb
2. Configurar la cadena de conexión en los archivos `appsettings.json` de cada microservicio, por ejemplo:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=InventarioDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=ProductosDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

### Migraciones y Base de Datos

1. Crear la base de datos:

```sql
   CREATE DATABASE InventarioDB;
   CREATE DATABASE ProductosDb;
```

2. Asegurarse que las bases de datos existan.
3. Ejecuta las migraciones para crear las tablas po cada microservicio:

```bash
cd /Productos.API
dotnet ef database update

cd /Transacciones.API
dotnet ef database update

```

4. En el Archivo *{./Script.sql}* se encuentra el script para las bases de datos y un ejemplo de producto.

## 💻 Ejecución del Backend

Los microservicio son:

/Productos.API
/Transacciones.API

Pasos para ejecutar:

```bash
cd /Productos.API
dotnet restore
dotnet ef database update
dotnet run
```

```bash
Copiar código
cd /Transacciones.API
dotnet restore
dotnet ef database update
dotnet run
```



### Entregables
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="75" height="75">
1. Listado dinámico de productos y transacciones con paginación.
2. Pantalla para la creación de productos.
3. Pantalla para la edición de productos.
4. Pantalla para la creación de transacciones.
5. Pantalla para la edición de transacciones.
6. Pantalla de filtros dinámicos.
7. Pantalla para la consulta de información de un formulario (extra).

   
<img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" width="75" height="75">
1. Listado dinámico de productos y transacciones con paginación.
2. Pantalla para la creación de productos.
3. Pantalla para la edición de productos.
4. Pantalla para la creación de transacciones.
5. Pantalla para la edición de transacciones.
6. Pantalla de filtros dinámicos.
7. Pantalla para la consulta de información de un formulario (extra).
