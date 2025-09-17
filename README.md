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



# Entregables

## FrontEnd React & Angular

  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="100" height="100">

### Uris

```path
http://localhost:5173/productos
http://localhost:5173/ListaProductos
http://localhost:5173/productosItem
http://localhost:5173/transacciones
http://localhost:5173/transaccionesItem
http://localhost:5173/ListaTransacciones
```
1. Listado dinámico de productos y transacciones con paginación.<br>
  Producto<br>
    <img width="962" height="702" alt="image" src="https://github.com/user-attachments/assets/bb6f2fc0-2ba9-44e9-bb0d-470e285949b4" />
    <img width="939" height="686" alt="image" src="https://github.com/user-attachments/assets/e02c2bad-cde4-4139-a8a2-c29a5181a810" />
  Transacción<br>
    <img width="1027" height="680" alt="image" src="https://github.com/user-attachments/assets/b1a41503-78f2-4c85-b9a4-0a5c7ba70d65" />

2. Pantalla para la creación de productos. <br>
  <img width="707" height="558" alt="image" src="https://github.com/user-attachments/assets/53245798-8a7a-4d73-bc91-be7b5945c8e4" />

3. Pantalla para la edición de productos. ␣␣ <br>
  <img width="869" height="642" alt="image" src="https://github.com/user-attachments/assets/346972ac-9e7c-466c-b9cd-80b402c54aff" />

4. Pantalla para la creación de transacciones.<br>
  <img width="847" height="619" alt="image" src="https://github.com/user-attachments/assets/35f76124-b56d-44ca-81de-d210bd5506c8" />
  <img width="854" height="619" alt="image" src="https://github.com/user-attachments/assets/7c2a166c-6787-465e-8a37-bdab99880552" />

5. Pantalla para la edición de transacciones.<br>
  <img width="869" height="642" alt="image" src="https://github.com/user-attachments/assets/346972ac-9e7c-466c-b9cd-80b402c54aff" />
  
6. Pantalla de filtros dinámicos.<br>
  <img width="1042" height="694" alt="image" src="https://github.com/user-attachments/assets/09833091-9497-4cf3-ba8f-6af870e4abfb" />

7. Pantalla para la consulta de información de un formulario (extra).<br>
  <img width="1042" height="694" alt="image" src="https://github.com/user-attachments/assets/09833091-9497-4cf3-ba8f-6af870e4abfb" />

8. Pantallas de transacciones Unificadas.<br>
  <img width="565" height="611" alt="image" src="https://github.com/user-attachments/assets/ecdd6e32-015e-43a6-9d2b-6883e13555f0" />

9. pantalla de Productos unificadas.<br>
  <img width="362" height="619" alt="image" src="https://github.com/user-attachments/assets/4c6a5992-194c-47d6-a597-9f101f8b8ea3" />

  
<img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" width="100" height="100">

### Uri todo unificado

```path
http://localhost:4200/
```

1. Listado dinámico de productos y transacciones con paginación.<br>
  Producto <br>
  <img width="888" height="593" alt="image" src="https://github.com/user-attachments/assets/376ff242-04b0-41ae-a5a7-9f138083a67b" />
  <img width="675" height="330" alt="image" src="https://github.com/user-attachments/assets/df34046f-6ad5-43ac-9f2f-79f85a7d67a8" />
  <img width="475" height="457" alt="image" src="https://github.com/user-attachments/assets/d91b6dc3-9829-489f-a92a-8d84544dc3cc" />
  <br>
  Transacciones<br>
  <img width="699" height="508" alt="image" src="https://github.com/user-attachments/assets/472640f0-e1aa-42e5-85cc-1c516677d033" />
  <img width="1021" height="544" alt="image" src="https://github.com/user-attachments/assets/26126d8a-9ba1-4060-a97f-a7cb604b294e" />
<br>
  
2. Pantalla para la creación de productos.<br>
  <img width="531" height="584" alt="image" src="https://github.com/user-attachments/assets/2e0b9b6a-3903-417f-b620-ca72948296b5" />

3. Pantalla para la edición de productos. <br>
     <img width="540" height="587" alt="image" src="https://github.com/user-attachments/assets/bf1faa2e-2ecc-4bbd-af1c-b886fb35df20" />

6. Pantalla de filtros dinámicos.<br>
<img width="1049" height="228" alt="image" src="https://github.com/user-attachments/assets/6f062efd-ea03-4911-b415-2d2dd6b2d03e" />
  <img width="1019" height="165" alt="image" src="https://github.com/user-attachments/assets/3d2d0075-d372-41f2-8385-3acc44221ec8" />


## BackEnd Dos microservicios

1. Productos.API<br> 
```path
http://localhost:5001/swagger/index.html
```
<img width="1128" height="557" alt="image" src="https://github.com/user-attachments/assets/eeb0d1e1-a0d2-4271-bb13-8e723bf579a5" />

2. Transacciones.API<br>

```path
http://localhost:5002/swagger/index.html
```
  <img width="1131" height="648" alt="image" src="https://github.com/user-attachments/assets/7e3cd96e-55d4-48f0-bc77-cd6dd0106884" />



