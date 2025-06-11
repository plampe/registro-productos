document.addEventListener("DOMContentLoaded", () => {
    cargarBodegas();
    cargarMonedas();
    cargarMateriales();
  
    document.getElementById("bodega").addEventListener("change", cargarSucursales);
  });
  
  function cargarBodegas() {
    fetch("php/cargar_bodegas.php")
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById("bodega");
        select.innerHTML = `<option value="" disabled selected hidden> </option>`;
        data.forEach(item => {
          select.innerHTML += `<option value="${item.id}">${item.nombre}</option>`;
        });
      });
  }
  
  function cargarSucursales() {
    const bodegaId = document.getElementById("bodega").value;
    if (!bodegaId) {
      document.getElementById("sucursal").innerHTML = `<option value="">Seleccione una sucursal</option>`;
      return;
    }
  
    fetch(`php/cargar_sucursales.php?bodega_id=${bodegaId}`)
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById("sucursal");
        select.innerHTML = `<option value="" disabled selected hidden> </option>`;
        data.forEach(item => {
          select.innerHTML += `<option value="${item.id}">${item.nombre}</option>`;
        });
      });
  }
  
  function cargarMonedas() {
    fetch("php/cargar_monedas.php")
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById("moneda");
       select.innerHTML = `<option value="" disabled selected hidden> </option>`;
        data.forEach(item => {
          select.innerHTML += `<option value="${item.id}">${item.nombre}</option>`;
        });
      });
  }
  
  function cargarMateriales() {
    fetch("php/cargar_materiales.php")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("materiales");
        container.innerHTML = '';
        data.forEach(item => {
          const checkbox = document.createElement("label");
          checkbox.innerHTML = `
            <input type="checkbox" name="materiales[]" value="${item.id}"> ${item.nombre}
          `;
          container.appendChild(checkbox);
        });
      });
  }

  document.getElementById("formProducto").addEventListener("submit", function(e) {
    e.preventDefault(); // prevenir envío hasta validar
  
    // Captura de valores
    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const bodega = document.getElementById("bodega").value;
    const sucursal = document.getElementById("sucursal").value;
    const moneda = document.getElementById("moneda").value;
    const precio = document.getElementById("precio").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
  
    const materialesSeleccionados = [...document.querySelectorAll("input[name='materiales[]']:checked")];
  
    // Validación 1: Código
    const codigoRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/;

      if (codigo === "") {
        alert("El código del producto no puede estar en blanco.");
        return;
      }
      if (!/[A-Za-z]/.test(codigo) || !/\d/.test(codigo)) {
        alert("El código del producto debe contener letras y números.");
        return;
      }
      if (codigo.length < 5 || codigo.length > 15) {
        alert("El código del producto debe tener entre 5 y 15 caracteres.");
        return;
}
  
    // Validación 2: Nombre
    if (nombre === "") {
      alert("El nombre del producto no puede estar en blanco.");
      return;
    }
    if (nombre.length < 2 || nombre.length > 50) {
      alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
      return;
    }
  
    // Validación 3: Precio
    const precioRegex = /^\d+(\.\d{1,2})?$/;
    if (precio === "") {
      alert("El precio del producto no puede estar en blanco.");
      return;
    }
    if (!precioRegex.test(precio)) {
      alert("El precio del producto debe ser un número positivo con hasta dos decimales.");
      return;
    }
  
    // Validación 4: Materiales
    if (materialesSeleccionados.length < 2) {
      alert("Debe seleccionar al menos dos materiales para el producto.");
      return;
    }
  
    // Validación 5: Bodega
    if (bodega === "") {
      alert("Debe seleccionar una bodega.");
      return;
    }
  
    // Validación 6: Sucursal
    if (sucursal === "") {
      alert("Debe seleccionar una sucursal para la bodega seleccionada.");
      return;
    }
  
    // Validación 7: Moneda
    if (moneda === "") {
      alert("Debe seleccionar una moneda para el producto.");
      return;
    }
  
    // Validación 8: Descripción
    if (descripcion === "") {
      alert("La descripción del producto no puede estar en blanco.");
      return;
    }
    if (descripcion.length < 10 || descripcion.length > 1000) {
      alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
      return;
    }
  
    // Validar en servidor si el código ya existe
    validarCodigoUnico(codigo).then(data => {
      if (data.exists) {
        alert("El código del producto ya está registrado.");
        return;
      }

    // Si todo bien, guardar
      console.log("Código único confirmado. Guardando producto...");
      guardarProducto();
    });
  });
  
  function guardarProducto() {
    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const bodega = document.getElementById("bodega").value;
    const sucursal = document.getElementById("sucursal").value;
    const moneda = document.getElementById("moneda").value;
    const precio = document.getElementById("precio").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
  
    const materiales = [...document.querySelectorAll("input[name='materiales[]']:checked")]
                       .map(el => el.value);
  
    const formData = new FormData();
    formData.append("codigo", codigo);
    formData.append("nombre", nombre);
    formData.append("bodega", bodega);
    formData.append("sucursal", sucursal);
    formData.append("moneda", moneda);
    formData.append("precio", precio);
    formData.append("descripcion", descripcion);
    materiales.forEach(id => formData.append("materiales[]", id));
  
    fetch("php/guardar_producto.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      if (response.status === "ok") {
        alert("Producto guardado exitosamente.");
        document.getElementById("formProducto").reset();
      } else {
        alert("Error: " + response.message);
      }
    })
    .catch(error => {
      alert("Error al guardar el producto.");
      console.error(error);
    });
  }
  
  function validarCodigoUnico(codigo) {
    return fetch(`php/validar_codigo.php?codigo=${codigo}`)
      .then(res => res.json());
  }
