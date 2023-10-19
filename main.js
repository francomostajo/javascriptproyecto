// Arreglo para almacenar la cantidad de turnos disponibles por día
const turnosPorDia = [5, 5, 5, 5, 5, 5, 5];

// Arreglo para almacenar los nombres de los días
const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Arreglo para almacenar el número de turno asignado por día
const turnosAsignadosPorDia = [0, 0, 0, 0, 0, 0, 0];

// Arreglo para almacenar los objetos de clientes
const clientes = [];

// Objeto para llevar un registro de los cambios de filtros
const cambiosFiltros = {
  filtrosAire: 0,
  filtrosAceite: 0
};

// Arrays para llevar un registro diario
const clientesDiarios = [0, 0, 0, 0, 0, 0, 0];
const filtrosAireDiarios = [0, 0, 0, 0, 0, 0, 0];
const filtrosAceiteDiarios = [0, 0, 0, 0, 0, 0, 0];

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

//Funcion para obtener los datos que realiza el cliente 
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
             // Realizar cambios y actualizar kilómetros
            const cambiosRealizadosMensaje = realizarCambio(cliente, cambiosCliente, cliente.kmVehiculo, turnoNumero);
            alert(cambiosRealizadosMensaje);
            // Resta el turno diario
            turnosPorDia[turnoNumero]--;
            // Agregar el objeto cliente al arreglo de clientes
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
    
    actualizarResumenDiario(turnoNumero);
    console.log("Datos del cliente ingresado:");
    console.log("Nombre:", cliente.nombre);
    console.log("Marca del vehículo:", cliente.vehiculo.marca);
    console.log("Modelo del vehículo:", cliente.vehiculo.modelo);
    const marcaBuscada = "toyota";
    const modeloBuscado = "2012";
    const clientesFiltrados = filtrarClientesPorMarcaYModelo(clientes, marcaBuscada, modeloBuscado);
    if (clientesFiltrados.length > 0) {
      console.log(`Clientes con la marca ${marcaBuscada} y modelo ${modeloBuscado}:`);
      clientesFiltrados.forEach(cliente => {
      console.log(`Nombre: ${cliente.nombre}, Marca: ${cliente.vehiculo.marca}, Modelo: ${cliente.vehiculo.modelo}`);
      });
    } 
    else {
    console.log(`No se encontraron clientes con la marca ${marcaBuscada} y modelo ${modeloBuscado}.`);
  }
  }
}
 // Llama a la función para ACTUALIZAR el resumen diario después de salir del bucle
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
//Filtro para obtener la marca y modelo del vehiculo de cliente
function filtrarClientesPorMarcaYModelo(clientes, marca, modelo) {
  return clientes.filter(cliente => {
    return (
      cliente.vehiculo.marca.toLowerCase() === marca.toLowerCase() &&
      cliente.vehiculo.modelo.toString() === modelo
    );
  });
}
console.log(clientes);
// Función para mostrar el resumen diario
function mostrarResumenDiario() {
  console.log("Resumen diario:");
  for (let i = 1; i <= 6; i++) {
    console.log(`Día ${nombresDias[i]} - Clientes atendidos: ${clientesDiarios[i]}, Filtros de aire cambiados: ${filtrosAireDiarios[i]}, Filtros de aceite cambiados: ${filtrosAceiteDiarios[i]}`);
  }
}
//Función para cancelar turno de cliente 
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

turnoSi();
mostrarResumenDiario(); 
//Cancelar turno según día y número de turno 
cancelarTurno("Lunes", 1);

