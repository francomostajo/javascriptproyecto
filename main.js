// Arreglo para almacenar la cantidad de turnos disponibles por día
const turnosPorDia = [5, 5, 5, 5, 5, 5, 5];
// Arreglo para almacenar los nombres de los días
const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
// Arreglo para almacenar el número de turno asignado por día
const turnosAsignadosPorDia = [0, 0, 0, 0, 0, 0, 0];
// Arreglo para almacenar los objetos de clientes
const clientes = cargarClientesDesdeLocalStorage() || [];
// Objeto para llevar un registro de los cambios de filtros
const cambiosFiltros = {
  filtrosAire: 0,
  filtrosAceite: 0
};
// Arrays para llevar un registro diario
const clientesDiarios = [0, 0, 0, 0, 0, 0, 0];
const filtrosAireDiarios = [0, 0, 0, 0, 0, 0, 0];
const filtrosAceiteDiarios = [0, 0, 0, 0, 0, 0, 0];

// Funciones para cargar y guardar datos en localStorage
function cargarClientesDesdeLocalStorage() {
  const storedClientesJSON = localStorage.getItem('clientesData');
  if (storedClientesJSON) {
    const storedClientes = JSON.parse(storedClientesJSON);
    return storedClientes;
  }
  return [];
}

function guardarClientesEnLocalStorage() {
  const clientesJSON = JSON.stringify(clientes);
  localStorage.setItem('clientesData', clientesJSON);
}

// Mensaje para los días disponibles
function mostrarDiasDisponibles() {
  alert("Estos son nuestros días en los que trabajamos y puedes reservar: \n\n" +
    "1- Lunes\n" +
    "2- Martes\n" +
    "3- Miércoles\n" +
    "4- Jueves\n" +
    "5- Viernes\n" +
    "6- Sábado");
}

// Función para obtener los datos que realiza el cliente
function realizarCambio(cliente, cambios, km, turnoNumero) {
  const cambiosRealizadosTexto = cambios.join("\n");
  const proximoCambioKm = km + 10000;
  const diaSeleccionado = nombresDias[turnoNumero];
  const turnoAsignado = obtenerProximoTurnoDisponible(turnoNumero);
  return `Se realizarán los siguientes cambios a:\nNombre: ${cliente.nombre} Marca: ${cliente.vehiculo.marca} Modelo: ${cliente.vehiculo.modelo}\n` +
    `Día seleccionado: ${diaSeleccionado}\n` +
    `Turno asignado: #${turnoAsignado}\n\n` +
    `${cambiosRealizadosTexto}\n` +
    `Próximo cambio de aceite es a los ${proximoCambioKm} km.`;
}

// Función para que el cliente ingrese kilómetros como número
function obtenerKilometrosVehiculo() {
  let kmVehiculo;
  do {
    const userInput = prompt("¿Cuántos kilómetros tiene el vehículo?");
    kmVehiculo = parseFloat(userInput);
    if (isNaN(kmVehiculo)) {
      alert("Por favor, ingresa solo números para los kilómetros del vehículo.");
    }
  } while (isNaN(kmVehiculo));
  return kmVehiculo;
}

// Función para gestionar los turnos disponibles
function obtenerProximoTurnoDisponible(turnoNumero) {
  if (turnosAsignadosPorDia[turnoNumero] === 0) {
    turnosAsignadosPorDia[turnoNumero] = 1;
  } else {
    turnosAsignadosPorDia[turnoNumero]++;
  }
  return turnosAsignadosPorDia[turnoNumero];
}

// Función principal para ejecutar los bucles
function turnoSi() {
  let continuar = true;
  let turnoNumero;
  let cambiosCliente;

  do {
    let cliente = {};
    cliente.vehiculo = {};

    cliente.nombre = prompt("Serco Lubricantes te da la bienvenida al gestor de turnos online, cuál es tu nombre?");
    if (cliente.nombre === null) {
      continuar = false;
      break;
    }

    if (cliente.nombre.trim() === "") {
      alert("Por favor, ingresa un nombre válido.");
      continue;
    }

    cliente.vehiculo.marca = prompt(`${cliente.nombre}, ¿cuál es la marca de tu vehículo?`);
    cliente.vehiculo.modelo = prompt(`${cliente.nombre}, ¿cuál es el modelo de tu vehículo?`);
    let consulta = prompt(`${cliente.nombre}, deseas un turno para que dejemos tu vehículo en excelente condiciones? \n\n Indica 'si' o selecciona 'aceptar'. Si deseas salir, escribe 'esc'`);
    if (consulta !== null) {
      consulta = consulta.toLowerCase();
    }
    if (consulta === "si" || consulta === "") {
      mostrarDiasDisponibles();
    } else {
      alert(`Perfecto ${cliente.nombre}, no dudes en consultar el gestor de turno online`);
      continuar = false; // Establecer continuar en false para salir del bucle principal
      break;
    }

    while (consulta !== "esc") {
      turnoNumero = parseInt(prompt("Ingrese el día que desea realizar el chequeo y/o cambio de aceite/filtros de su vehículo (1-6)"));
      if (turnoNumero >= 1 && turnoNumero <= 6) {
        const diaSeleccionado = nombresDias[turnoNumero];
        if (turnosPorDia[turnoNumero] > 0) {
          cambiosCliente = [];
          const cambiarFiltroAire = confirm("¿Desea cambiar el filtro de aire?");
          const cambiarFiltroAceite = confirm("¿Desea cambiar el filtro de aceite?");
          const cambiarAceite = confirm("¿Desea cambiar el aceite?");
          cliente.kmVehiculo = obtenerKilometrosVehiculo();
          if (cambiarFiltroAire) {
            cambiosCliente.push("Filtro de aire");
          }
          if (cambiarFiltroAceite) {
            cambiosCliente.push("Filtro de aceite");
          }
          if (cambiarAceite) {
            cambiosCliente.push("Aceite");
          }
          // Realizar cambios y actualizar kilómetros
          const cambiosRealizadosMensaje = realizarCambio(cliente, cambiosCliente, cliente.kmVehiculo, turnoNumero);
          alert(cambiosRealizadosMensaje);
          // Resta el turno diario
          turnosPorDia[turnoNumero]--;
          // Agregar el objeto cliente al arreglo de clientes
          clientes.push(cliente);
        } else {
          alert(`No hay más turnos disponibles para el día ${diaSeleccionado}`);
        }
      } else {
        alert("Por favor, ingrese un número válido del 1 al 6 para seleccionar un día.");
      }
      consulta = prompt(`${cliente.nombre}, deseas otro turno? (si/esc)`);
      if (consulta) {
        consulta = consulta.toLowerCase();
      }
    }

    // Llama a la función para actualizar los cambios de filtros después de salir del bucle
    if (cambiosCliente) {
      actualizarCambiosFiltros(cambiosCliente, turnoNumero);
    }

    actualizarResumenDiario(turnoNumero);
    console.log("Datos del cliente ingresado:");
    console.log("Nombre:", cliente.nombre);
    console.log("Marca del vehículo:", cliente.vehiculo.marca);
    console.log("Modelo del vehículo:", cliente.vehiculo.modelo);
  } while (continuar); // Salir del bucle si el usuario no desea continuar

  // Llama a la función para ACTUALIZAR el resumen diario después de salir del bucle
  mostrarResumenDiario();
  guardarClientesEnLocalStorage(); // Guardar los datos en el almacenamiento local
}

function actualizarResumenDiario(turnoNumero) {
  clientesDiarios[turnoNumero]++;
}

function actualizarCambiosFiltros(cambiosCliente, turnoNumero) {
  if (cambiosCliente) {
    if (cambiosCliente.includes("Filtro de aire")) {
      filtrosAireDiarios[turnoNumero]++;
    }
    if (cambiosCliente.includes("Filtro de aceite")) {
      filtrosAceiteDiarios[turnoNumero]++;
    }
  }
}

function mostrarResumenDiario() {
  console.log("Resumen diario:");
  for (let i = 1; i <= 6; i++) {
    console.log(`Día ${nombresDias[i]} - Clientes atendidos: ${clientesDiarios[i]}, Filtros de aire cambiados: ${filtrosAireDiarios[i]}, Filtros de aceite cambiados: ${filtrosAceiteDiarios[i]}`);
  }
}

function cancelarTurno(dia, numeroTurno) {
  const indiceDia = nombresDias.indexOf(dia);
  if (indiceDia !== -1) {
    if (turnosPorDia[indiceDia] > 0) {
      if (numeroTurno >= 1 && numeroTurno <= 5) {
        turnosPorDia[indiceDia]--;
        console.log(`Se ha cancelado el turno #${numeroTurno} del día "${dia}".`);
      } else {
        console.log(`El número de turno ${numeroTurno} no es válido.`);
      }
    } else {
      console.log(`No hay más turnos disponibles para el día "${dia}".`);
    }
  } else {
    console.log(`El día "${dia}" no se encontró en la lista.`);
  }
}

function iniciarPrograma() {
  turnoSi();
}

iniciarPrograma();



