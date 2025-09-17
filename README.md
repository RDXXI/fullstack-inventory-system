# Fullstack Inventory Management App/Sistema de Gestión de Inventario
# .NET Microservices + React + Angular + SQL

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



## Entregables
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="100" height="100">

### Uris
*http://localhost:5173/productos*
*http://localhost:5173/ListaProductos*
*http://localhost:5173/productosItem*
*http://localhost:5173/transacciones*
*http://localhost:5173/transaccionesItem*
*http://localhost:5173/ListaTransacciones*

1. Listado dinámico de productos y transacciones con paginación.
  Producto
    <img width="962" height="702" alt="image" src="https://github.com/user-attachments/assets/bb6f2fc0-2ba9-44e9-bb0d-470e285949b4" />
    <img width="939" height="686" alt="image" src="https://github.com/user-attachments/assets/e02c2bad-cde4-4139-a8a2-c29a5181a810" />
  Transacción
    <img width="1027" height="680" alt="image" src="https://github.com/user-attachments/assets/b1a41503-78f2-4c85-b9a4-0a5c7ba70d65" />

2. Pantalla para la creación de productos.
<img width="707" height="558" alt="image" src="https://github.com/user-attachments/assets/53245798-8a7a-4d73-bc91-be7b5945c8e4" />

3. Pantalla para la edición de productos.
  <img width="869" height="642" alt="image" src="https://github.com/user-attachments/assets/346972ac-9e7c-466c-b9cd-80b402c54aff" />

4. Pantalla para la creación de transacciones.
  <img width="847" height="619" alt="image" src="https://github.com/user-attachments/assets/35f76124-b56d-44ca-81de-d210bd5506c8" />
  <img width="854" height="619" alt="image" src="https://github.com/user-attachments/assets/7c2a166c-6787-465e-8a37-bdab99880552" />

5. Pantalla para la edición de transacciones.
  <img width="869" height="642" alt="image" src="https://github.com/user-attachments/assets/346972ac-9e7c-466c-b9cd-80b402c54aff" />
  
6. Pantalla de filtros dinámicos.
  <img width="1042" height="694" alt="image" src="https://github.com/user-attachments/assets/09833091-9497-4cf3-ba8f-6af870e4abfb" />

7. Pantalla para la consulta de información de un formulario (extra).
  <img width="1042" height="694" alt="image" src="https://github.com/user-attachments/assets/09833091-9497-4cf3-ba8f-6af870e4abfb" />

8. Pantallas de transacciones Unificadas.
  <img width="565" height="611" alt="image" src="https://github.com/user-attachments/assets/ecdd6e32-015e-43a6-9d2b-6883e13555f0" />

9. pantalla de Productos unificadas.
  <img width="362" height="619" alt="image" src="https://github.com/user-attachments/assets/4c6a5992-194c-47d6-a597-9f101f8b8ea3" />

    
<img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" width="100" height="100">
1. Listado dinámico de productos y transacciones con paginación.
2. Pantalla para la creación de productos.
3. Pantalla para la edición de productos.
4. Pantalla para la creación de transacciones.
5. Pantalla para la edición de transacciones.
6. Pantalla de filtros dinámicos.
7. Pantalla para la consulta de información de un formulario (extra).
