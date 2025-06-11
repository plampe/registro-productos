# registro-productos
Proyecto: Registro de Productos - Prueba Técnica

Desarrollado por: Paola Lampe
Fecha: Junio 2025

Descripción:
Este proyecto es una aplicación web que permite registrar productos a través de un formulario validado con JavaScript. Los datos se almacenan en una base de datos PostgreSQL y están conectados mediante PHP puro. También se utilizan técnicas de AJAX para una experiencia dinámica sin recargar la página.

Tecnologías usadas:
- HTML5
- CSS3 
- JavaScript (nativo)
- PHP 
- PostgreSQL
- AJAX (fetch API)

Requisitos:
- Servidor local (MAMP, Apache)
- PHP 8.x o superior
- PostgreSQL 13 o superior

Pasos para instalar el proyecto:

1. Clona o descarga este repositorio en la carpeta `htdocs` de tu servidor local (MAMP).
2. Abre pgAdmin y ejecuta el archivo `sql/esquema.sql` para crear las tablas necesarias.
3. Configura la conexión en el archivo `php/config.php` con tus credenciales locales de PostgreSQL.
4. Inicia el servidor Apache desde MAMP.
5. Abre tu navegador y entra en: `http://localhost:8888/nombre-del-proyecto/index.html`
6. Llena el formulario y guarda un producto para probar su funcionalidad.

Estructura del Proyecto:
├── index.html
├── README.txt
├── css/
│   └── style.css
├── js/
│   └── main.js
├── php/
│   ├── config.php
│   ├── guardar_producto.php
│   ├── cargar_bodegas.php
│   ├── cargar_sucursales.php
│   ├── cargar_monedas.php
│   ├── cargar_materiales.php
├── sql/
│   └── esquema.sql

---
