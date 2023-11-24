// Objeto cliente para almacenar información del cliente
let cliente = {
  nombre: '',
  marcaVehiculo: '',
  modeloVehiculo: '',
  cambiosRealizados: [],
  turnos: [],
  // Otros datos que desees almacenar sobre el cliente
};

// Objeto para gestionar funciones relacionadas con el cliente
const clienteManager = {
  // Inicializa el cliente y carga datos desde localStorage al cargar la página
  async init() {
    try {
      await this.cargarDesdeLocalStorage();
      console.log('Cliente inicializado');
    } catch (error) {
      this.mostrarError('Error al inicializar el cliente: ' + error.message);
    }
  },

  // Carga los datos del cliente desde localStorage
  cargarDesdeLocalStorage() {
    return new Promise((resolve, reject) => {
      try {
        if (typeof Storage !== 'undefined') {
          const clienteAlmacenado = localStorage.getItem('cliente');
          if (clienteAlmacenado) {
            cliente = JSON.parse(clienteAlmacenado);
            console.log('Datos del cliente cargados desde localStorage');
            resolve();
          } else {
            reject(new Error('No hay datos almacenados en localStorage.'));
          }
        } else {
          reject(new Error('El navegador no soporta localStorage. No se pudieron cargar los datos del cliente.'));
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  // Muestra un mensaje de error usando Toastify
  mostrarError(mensaje) {
    Toastify({
      text: mensaje,
      backgroundColor: 'linear-gradient(90deg, red, rgba(233, 86, 7, 0.85))',
      className: 'error-toast',
    }).showToast();
  },
  // Validar campos del formulario
  validarCampos(nombre, marca, modelo, km, cambios, anio) {
    // Verificar si el año es un número y está dentro del rango
    if (isNaN(anio) || anio < 1990 || anio > 2023) {
      this.mostrarError('Por favor, introduce un año válido dentro del rango 1990-2023.');
      return false;
    }
      // Validar que el nombre y el modelo solo contengan texto
    if (!/^[a-zA-Z]+$/.test(nombre)) {
    this.mostrarError('Por favor, introduce un nombre válido (solo texto).');
    return false;
    }
    // Resto de la validación
    if (
      nombre.trim() === '' ||
      marca.trim() === '' ||
      modelo.trim() === '' ||
      isNaN(km) ||
      km <= 0 ||
      !Number.isInteger(km)
    ) {
      this.mostrarError('Por favor, completa correctamente.');
      return false;
    }
  
    return true;
  },

  // Obtener cambios seleccionados en el formulario
  obtenerCambiosSeleccionados() {
    const cambios = [];
    const checkboxes = document.querySelectorAll('.check');

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        cambios.push(checkbox.nextElementSibling.textContent.trim());
      }
    });

    return cambios;
  },

  // Agregar un nuevo turno
  agregarTurno(nombre, marca, modelo, km, cambios) {
    const turno = {
      nombre: nombre,
      marcaVehiculo: marca,
      modeloVehiculo: modelo,
      kilometros: km,
      cambiosRealizados: cambios,
    };

    cliente.turnos.push(turno);
  },

  // Mostrar un resumen del cliente
  mostrarResumenCliente() {
    const resumen = document.getElementById('resumenDiario');
    resumen.innerHTML = `
        <h2>Resumen del último turno:</h2>
        <p>Nombre: ${cliente.nombre}</p>
        <p>Vehículo: ${cliente.marcaVehiculo} ${cliente.modeloVehiculo}</p>
        <p>Kilómetros: ${cliente.kilometros}</p>
        <p>Cambios realizados: ${cliente.cambiosRealizados.join(', ')}</p>
    `;
    this.guardarEnLocalStorage();
  },

  // Guardar los datos del cliente en localStorage
  guardarEnLocalStorage() {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('cliente', JSON.stringify(cliente));
      console.log('Datos del cliente almacenados en localStorage');
    } else {
      this.mostrarError('El navegador no soporta localStorage. No se pudieron almacenar los datos del cliente.');
    }
  },
};

// Llama a la función de inicialización del clienteManager
clienteManager.init();

// Sección relacionada con la gestión de turnos y resumen diario

// Elementos del DOM
const resumenDiario = document.getElementById('resumenDiario');
const datosCliente = document.getElementById('datosCliente');

// Arreglo para almacenar la cantidad de turnos disponibles por día
const turnosPorDia = [5, 5, 5, 5, 5, 5, 5];
const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const turnosAsignadosPorDia = [0, 0, 0, 0, 0, 0, 0];

// Declarar la variable clientes
const clientes = [];

// Función para cargar los datos de clientes desde el almacenamiento local
function cargarClientesDesdeLocalStorage() {
  const storedClientesJSON = localStorage.getItem('clientesData');
  if (storedClientesJSON) {
    const storedClientes = JSON.parse(storedClientesJSON);
    // Asignar los datos recuperados a la variable clientes
    clientes.push(...storedClientes);
  }
}

// Llama a la función para cargar los datos al inicio
cargarClientesDesdeLocalStorage();

// Obten el datalist y el input de marca
const datalistMarcas = document.getElementById('marcasList');
const inputMarca = document.getElementById('marcaInput');

// Fetch para obtener las marcas desde el JSON
fetch('./marcas.json') 
  .then(response => response.json())
  .then(marcasData => {
    // Itera sobre las marcas y agrégales al datalist
    marcasData.forEach(marca => {
      const option = document.createElement('option');
      option.value = marca.nombre; // Asumiendo que el nombre de la marca está en la propiedad "nombre"
      datalistMarcas.appendChild(option);
    });
  // Event listener para el formulario de turnos
    turnoForm.addEventListener('submit', (event) => {
      event.preventDefault();
  // Obtener el valor del campo de marca
      const marcaIngresada = document.getElementById('marcaInput').value;
  // Verificar si la marca ingresada está en la lista de marcas del JSON
      const marcaValida = marcasData.some(marca => marca.nombre.toLowerCase() === marcaIngresada.toLowerCase());
  // Si la marca no es válida, mostrar un mensaje de error con Toastify
      if (!marcaValida) {
        clienteManager.mostrarError('Por favor, selecciona una marca válida.');
      return;
      }
      const modelo = document.getElementById('modelo').value;
      const dia = parseInt(document.getElementById('dia').value);
      const cambios = clienteManager.obtenerCambiosSeleccionados();
      const kmInput = document.getElementById('km'); 
      const km = parseFloat(kmInput.value);
      const anioInput = document.getElementById('anio');
      const anio = parseInt(anioInput.value);
      const nombre = document.getElementById('nombre').value;
      if (!clienteManager.validarCampos(nombre, marcaIngresada, modelo, km, cambios, anio)) {
        return;
      }
      mostrarCambiosYRestablecerCampos(nombre, marcaIngresada, modelo, dia, cambios, km, anio);
    });
  })
  .catch(error => console.error('Error al obtener las marcas:', error));

// Llama a la función para mostrar el resumen en el HTML y en la consola
mostrarResumenDiario();

// Función principal para mostrar cambios y restablecer campos
function mostrarCambiosYRestablecerCampos(nombre, marca, modelo, dia, cambios, km, anio) {
  const diaSeleccionado = nombresDias[dia];

  // Validar que los kilómetros sean positivos antes de continuar
  if (km < 0 || isNaN(km)) {
    clienteManager.mostrarError('Por favor, introduce un número de kilómetros válido.');
    return; // Detener la ejecución de la función
  }

  // Limpiar el mensaje de error si no hay error
  const mensajeError = document.getElementById('mensajeError');
  mensajeError.textContent = '';

  const turnoAsignado = obtenerProximoTurnoDisponible(dia);

  if (turnosPorDia[dia] > 0) {
    const cambiosRealizadosTexto = cambios.join('\n');
    const proximoCambioKm = km + 10000;
    const cliente = {
      nombre,
      marca,
      modelo,
      anio,
      dia: diaSeleccionado,
      cambios,
    };

    Swal.fire({
      title: 'Turno Reservado',
      icon: 'success',
      html: `<div class="customAlertCliente" style="color: black;">
          <p>Se realizarán los siguientes cambios a:</p>
          <p>Nombre: ${cliente.nombre}</p>
          <p>Marca: ${cliente.marca}</p>
          <p>Modelo: ${cliente.modelo}</p>
          <p>Año: ${cliente.anio}</p>
          <p>Día seleccionado: ${cliente.dia}</p>
          <p>Turno asignado: #${turnoAsignado}</p>
          <p>${cambiosRealizadosTexto}</p>
          <p>Próximo cambio de aceite es a los ${proximoCambioKm} km.</p>
        </div>`,
      width: 600,
      background: "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(./serco-dos-camio-aceite.jpg)",
      didOpen: () => {
        const titleElement = document.querySelector('.swal2-title');
        titleElement.style.backgroundImage = 'linear-gradient(180deg, rgba(39, 39, 39, 0.95), rgba(233, 86, 7, 0.85))';
        titleElement.style.paddingBottom = '10px';
        titleElement.style.color = 'black';
      }
    });

    clientes.push(cliente);
    turnosPorDia[dia]--;
    document.getElementById('nombre').value = '';
    document.getElementById('marcaInput').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('anio').value = '';
    document.getElementById('dia').value = '1';
    document.getElementById('filtroAire').checked = false;
    document.getElementById('filtroAceite').checked = false;
    document.getElementById('cambioAceite').checked = false;
    document.getElementById('km').value = '';
    mostrarResumenDiario();
    guardarClientesEnLocalStorage();
  } 
  else {
    Swal.fire({
      icon: 'warning',
      title: 'Sin Turnos Disponibles',
      text: `No hay más turnos disponibles para el día ${diaSeleccionado}`,
    });
  }
}

// Función para obtener el próximo turno disponible
function obtenerProximoTurnoDisponible(dia) {
  if (turnosAsignadosPorDia[dia] === 0) {
    turnosAsignadosPorDia[dia] = 1;
  } else {
    turnosAsignadosPorDia[dia]++;
  }
  return turnosAsignadosPorDia[dia];
}

// Función para actualizar el resumen diario en el HTML
function mostrarResumenDiario() {
  actualizarResumenEnHTML();
  mostrarResumenEnConsola();
}

// Función para mostrar el resumen diario en el HTML
function actualizarResumenEnHTML() {
  resumenDiario.innerHTML = "<div id='resumen-diario'><strong>Turnos Disponibles:</strong><br>";
  for (let i = 1; i <= 6; i++) {
    resumenDiario.innerHTML += `<p class='dia-info'><strong>Día ${nombresDias[i]} - Turnos disponibles:</strong> <span class='turnos-disponibles'>${turnosPorDia[i]}</span></p>`;
  }
  resumenDiario.innerHTML += "</div>";
}

// Función para mostrar el resumen general en la consola de clientes
function mostrarResumenEnConsola() {
  console.clear(); // Limpia la consola antes de mostrar el resumen
  for (let i = 1; i <= 6; i++) {
    const dia = nombresDias[i];
    const cambiosRealizadosDia = clientes.filter(cliente => cliente.dia === dia);
    const filtrosAireRealizados = cambiosRealizadosDia.filter(cliente => cliente.cambios.includes("Filtro de aire")).length;
    const filtrosAceiteRealizados = cambiosRealizadosDia.filter(cliente => cliente.cambios.includes("Filtro de aceite")).length;
    const cambiosAceiteRealizados = cambiosRealizadosDia.filter(cliente => cliente.cambios.includes("Aceite")).length;
    console.log(`Resumen para el ${dia}:`);
    console.log(`- Cambios realizados: ${cambiosRealizadosDia.length}`);
    console.log(`- Filtros de aire: ${filtrosAireRealizados}`);
    console.log(`- Filtros de aceite: ${filtrosAceiteRealizados}`);
    console.log(`- Cambios de aceite: ${cambiosAceiteRealizados}`);
  }
}

// Función para guardar los datos de clientes en el almacenamiento local
function guardarClientesEnLocalStorage() {
  const clientesJSON = JSON.stringify(clientes);
  localStorage.setItem('clientesData', clientesJSON);
}
// Llama a la función para mostrar el resumen en el HTML y en la consola
mostrarResumenDiario();
