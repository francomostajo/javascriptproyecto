const turnoForm = document.getElementById('turnoForm');
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

//Función relacionado al html
turnoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const dia = parseInt(document.getElementById('dia').value);
  const cambios = [];
  const filtroAire = document.getElementById('filtroAire');
  const filtroAceite = document.getElementById('filtroAceite');
  const cambioAceite = document.getElementById('cambioAceite');
  if (filtroAire.checked) {
    cambios.push("Filtro de aire");
  }
  if (filtroAceite.checked) {
    cambios.push("Filtro de aceite");
  }
  if (cambioAceite.checked) {
    cambios.push("Aceite");
  }
  const km = parseFloat(document.getElementById('km').value);
  mostrarCambiosYRestablecerCampos(nombre, marca, modelo, dia, cambios, km);
});

//Función principal
function mostrarCambiosYRestablecerCampos(nombre, marca, modelo, dia, cambios, km) {
  const diaSeleccionado = nombresDias[dia];
  const turnoAsignado = obtenerProximoTurnoDisponible(dia);
  if (turnosPorDia[dia] > 0) {
    const cambiosRealizadosTexto = cambios.join("\n");
    const proximoCambioKm = km + 10000;
    const cliente = {
      nombre,
      marca,
      modelo,
      dia: diaSeleccionado,
      cambios,
    };
    const cambiosRealizadosAlert = `Se realizarán los siguientes cambios a:\n
        Nombre: ${cliente.nombre}
        Marca: ${cliente.marca}
        Modelo: ${cliente.modelo}
        Día seleccionado: ${cliente.dia}
        Turno asignado: #${turnoAsignado}\n
        ${cambiosRealizadosTexto}\n
        Próximo cambio de aceite es a los ${proximoCambioKm} km.`;
          // Mostrar la información en un alert
          alert(cambiosRealizadosAlert);
          // Registrar cliente atendido y actualizar estadísticas
    clientes.push(cliente);
    turnosPorDia[dia]--;
    // Restablece los campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('dia').value = '1';
    document.getElementById('filtroAire').checked = false;
    document.getElementById('filtroAceite').checked = false;
    document.getElementById('cambioAceite').checked = false;
    document.getElementById('km').value = '';
  mostrarResumenDiario();
  guardarClientesEnLocalStorage();
  } 
  else {
    alert(`No hay más turnos disponibles para el día ${diaSeleccionado}`);
  }
}
//Función turno disponible
function obtenerProximoTurnoDisponible(dia) {
  if (turnosAsignadosPorDia[dia] === 0) {
    turnosAsignadosPorDia[dia] = 1;
  } 
  else {
    turnosAsignadosPorDia[dia]++;
  }
  return turnosAsignadosPorDia[dia];
}
//Función para actualizar resumen
function mostrarResumenDiario() {
  actualizarResumenEnHTML();
  mostrarResumenEnConsola();
}
//Función para mostrar resumen en HTML
function actualizarResumenEnHTML() {
  resumenDiario.innerHTML = "<div id='resumen-diario'><strong>Turnos Disponibles:</strong><br>";
  for (let i = 1; i <= 6; i++) {
    resumenDiario.innerHTML += `<p class='dia-info'><strong>Día ${nombresDias[i]} - Turnos disponibles:</strong> <span class='turnos-disponibles'>${turnosPorDia[i]}</span></p>`;
  }
  resumenDiario.innerHTML += "</div>";
}
//Función para mostrar resumen general en consola de clientes 
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
