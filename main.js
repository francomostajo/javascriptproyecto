const turnosPorDia = [5, 5, 5, 5, 5, 5, 5];
const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const turnosAsignadosPorDia = [0, 0, 0, 0, 0, 0, 0];
const clientes = [];
const cambiosFiltros = {
  filtrosAire: 0,
  filtrosAceite: 0
};
const clientesDiarios = [0, 0, 0, 0, 0, 0, 0];
const filtrosAireDiarios = [0, 0, 0, 0, 0, 0, 0];
const filtrosAceiteDiarios = [0, 0, 0, 0, 0, 0, 0];

function mostrarDiasDisponibles() {
  alert("Estos son nuestros días en los que trabajamos y puedes reservar: \n\n" +
    "1- Lunes\n" +
    "2- Martes\n" +
    "3- Miércoles\n" +
    "4- Jueves\n" +
    "5- Viernes\n" +
    "6- Sábado");
}

function realizarCambio(cliente, cambios, km, turnoNumero) {
  const cambiosRealizadosTexto = cambios.join("\n");
  const proximoCambioKm = km + 10000;
  const diaSeleccionado = nombresDias[turnoNumero];
  const turnoAsignado = obtenerProximoTurnoDisponible(turnoNumero);
  return `Se realizarán los siguientes cambios a:\nNombre: ${cliente.nombre}\n` +
    `Día seleccionado: ${diaSeleccionado}\n` +
    `Turno asignado: #${turnoAsignado}\n\n` +
    `${cambiosRealizadosTexto}\n` +
    `Próximo cambio de aceite es a los ${proximoCambioKm} km.`;
}

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

function obtenerProximoTurnoDisponible(turnoNumero) {
  if (turnosAsignadosPorDia[turnoNumero] === 0) {
    turnosAsignadosPorDia[turnoNumero] = 1;
  } 
  else {
    turnosAsignadosPorDia[turnoNumero]++;
  }
  return turnosAsignadosPorDia[turnoNumero];
}

function turnoSi() {
  let continuar = true;
  let turnoNumero;
  let cambiosCliente;
  
  while (continuar) {
    let cliente = {};
    cliente.vehiculo = {};
    cliente.nombre = prompt("Serco Lubricantes te da la bienvenida al gestor de turnos online, cuál es tu nombre?");
    cliente.vehiculo.marca = prompt(`${cliente.nombre}, ¿cuál es la marca de tu vehículo?`);
    cliente.vehiculo.modelo = prompt(`${cliente.nombre}, ¿cuál es el modelo de tu vehículo?`);
    let consulta = prompt(`${cliente.nombre}, deseas un turno para que dejemos tu vehículo en excelente condiciones? \n\n Indica 'si' o selecciona 'aceptar'. Si deseas salir, escribe 'esc'`).toLowerCase();
    
    while (consulta !== "esc") {
      if (consulta === "si" || consulta === "") {
        mostrarDiasDisponibles();
      } 
      else {
        alert(`Perfecto ${cliente.nombre}, no dudes en consultar el gestor de turno online`);
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
            const cambiosRealizadosMensaje = realizarCambio(cliente, cambiosCliente, cliente.kmVehiculo, turnoNumero);
            alert(cambiosRealizadosMensaje);
            turnosPorDia[turnoNumero]--;
            clientes.push(cliente);
          } 
          else {
            alert(`No hay más turnos disponibles para el día ${diaSeleccionado}`);
          }
        } 
        else {
          alert("Por favor, ingrese un número válido del 1 al 6 para seleccionar un día.");
        }
        consulta = prompt(`${cliente.nombre}, deseas otro turno? (si/esc)`).toLowerCase();
      }
      continuar = confirm("¿Deseas cargar los datos de otro usuario? (Aceptar para continuar, Cancelar para salir)");
    }
    // Llama a la función para actualizar los cambios de filtros después de salir del bucle
    if (cambiosCliente) {
      actualizarCambiosFiltros(cambiosCliente, turnoNumero);
    }
    // Llama a la función para actualizar el resumen diario después de salir del bucle
    actualizarResumenDiario(turnoNumero);

  }
}

function filtrarClientesPorMarcaYModelo(clientes, marca, modelo) {
  return clientes.filter(cliente => {
    return cliente.vehiculo.marca.toLowerCase() === marca.toLowerCase() && cliente.vehiculo.modelo.toLowerCase() === modelo.toLowerCase();
  });
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


const marcaBuscada = "toyota";
const modeloBuscado = "fiat";
const clientesFiltrados = filtrarClientesPorMarcaYModelo(clientes, marcaBuscada, modeloBuscado);
if (clientesFiltrados.length > 0) {
  console.log(`Clientes con la marca ${marcaBuscada} y modelo ${modeloBuscado}:`);
  clientesFiltrados.forEach(cliente => {
    console.log(`Nombre: ${cliente.nombre}, Marca: ${cliente.vehiculo.marca}, Modelo: ${cliente.vehiculo.modelo}`);
  });
} else {
  console.log(`No se encontraron clientes con la marca ${marcaBuscada} y modelo ${modeloBuscado}.`);
}

turnoSi();
mostrarResumenDiario(); 
