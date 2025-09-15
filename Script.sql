
CREATE DATABASE ProductosDb;
GO


CREATE DATABASE TransaccionDb;
GO


INSERT INTO Productos (Nombre, Descripcion, Categoria, ImagenUrl, Precio, Stock)
VALUES
('Camiseta Deportiva', 'Camiseta ligera y transpirable ideal para deportes.', 'Ropa', 'https://www.aki.com.ec/catalogo-ropa/wp-content/uploads/2020/12/7861197811878-1.jpg', 19.99, 50),
('Auriculares Inalámbricos', 'Auriculares bluetooth con cancelación de ruido.', 'Electrónica', 'https://www.beepcom.ec/2060-large_default/auriculares-inalambricos-airpods-pro-2-generacion.jpg', 59.99, 30),
('Mochila Escolar', 'Mochila resistente con múltiples compartimentos.', 'Accesorios', 'https://tottoecuador.vtexassets.com/arquivos/ids/348471/1.jpg?v=638772535953300000', 34.50, 20),
('Lámpara de Mesa', 'Lámpara LED ajustable para escritorio o noche.', 'Hogar', 'https://www.todohogar.com/283941-medium_default/lampara-para-mesa-con-base-ovalada-franjas-gris-59cm-de-ceramica-y-pantalla-redonda-beige-33cm.jpg', 25.00, 15),
('Zapatillas Running', 'Zapatillas cómodas para correr o caminar.', 'Calzado', 'https://vasari.vteximg.com.br/arquivos/ids/210686-1000-1000/DZZ174817-RJ-25.jpg?v=638042316232430000', 49.90, 40),
('Libro de Cocina Vegana', 'Recetas saludables y fáciles de preparar.', 'Libros', 'https://letraslibres.com/wp-content/uploads/2016/05/libros-viejos-230813.jpg.webp', 18.75, 60),
('Botella Reutilizable', 'Botella de acero inoxidable para agua fría y caliente.', 'Hogar', 'https://lacasadelesparadrapo-ec.com/wp-content/uploads/2021/12/botella-de-agua.png', 15.00, 100),
('Gafas de Sol', 'Gafas de sol con protección UV 400.', 'Accesorios', 'https://olaecuador.vtexassets.com/arquivos/ids/158138-800-auto?v=638465601081070000&width=800&height=auto&aspect=true', 29.99, 25),
('Smartwatch Deportivo', 'Reloj inteligente con monitor de ritmo cardíaco.', 'Electrónica', 'https://tiendapl.com.ec/wp-content/uploads/2023/05/PL-649-SMARTWATCH-H8-ULTRA.jpg', 79.99, 10),
('Silla Ergonomica', 'Silla cómoda para oficina con soporte lumbar.', 'Muebles', 'https://provis.com.ec/wp-content/uploads/2021/09/silla-ergonomica-PRO-810AW.png', 120.00, 5);