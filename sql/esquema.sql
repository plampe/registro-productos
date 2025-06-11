-- Tabla de bodegas
CREATE TABLE bodegas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de sucursales, relacionadas a una bodega
CREATE TABLE sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    bodega_id INTEGER REFERENCES bodegas(id)
);

-- Tabla de monedas
CREATE TABLE monedas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

-- Tabla de materiales (checkboxes)
CREATE TABLE materiales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    bodega_id INTEGER REFERENCES bodegas(id),
    sucursal_id INTEGER REFERENCES sucursales(id),
    moneda_id INTEGER REFERENCES monedas(id),
    precio DECIMAL(10,2) NOT NULL,
    descripcion TEXT NOT NULL
);

-- Tabla relación producto-materiales
CREATE TABLE producto_material (
    producto_id INTEGER REFERENCES productos(id),
    material_id INTEGER REFERENCES materiales(id),
    PRIMARY KEY (producto_id, material_id)
);

-- Datos de ejemplo
INSERT INTO bodegas (nombre) VALUES ('Bodega Central'), ('Bodega Norte');
INSERT INTO sucursales (nombre, bodega_id) VALUES 
('Sucursal A', 1), ('Sucursal B', 1), ('Sucursal C', 2), ('Sucursal D', 2), ('Sucursal E', 2);
INSERT INTO monedas (nombre) VALUES ('CLP'), ('USD'), ('EUR');
INSERT INTO materiales (nombre) VALUES ('Plástico'), ('Metal'), ('Madera'), ('Vidrio'), ('Textil');
