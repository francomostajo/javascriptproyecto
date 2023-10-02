let turnoNombre = prompt("Serco Lubricantes te da la bienvenida al gestor de turnos online, cuál es tu nombre?");
let consulta = prompt(`${turnoNombre}, deseas un turno para que dejemos tu vehículo en excelente condiciones? \n\n Indica 'si' o selecciona 'aceptar'. Si deseas salir, escribe 'esc'`).toLowerCase();

function turnoSi() {
    
  let nombresDias = ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]; 
  while (consulta !== "esc") {
    if (consulta === "si" || consulta === "") {
      alert("Estos son nuestros días en los que trabajamos y puedes reservar: \n\n 1- Lunes \n 2- Martes \n 3- Miércoles \n 4- Jueves \n 5- Viernes \n 6- Sábado");
    } 
    else {
      alert(`Perfecto ${turnoNombre}, no dudes en consultar el gestor de turno online`);
      break;
    }
    let turnosPorDia = 5;
    let turnosAsignados = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    };
    
    while (consulta !== "esc") {
      let turnoNumero = parseInt(prompt("Ingrese el día que desea realizar el chequeo y/o cambio de aceite/filtros de su vehículo (1-6)"));
      if (turnoNumero >= 1 && turnoNumero <= 6) {
        if (turnosAsignados[turnoNumero] < turnosPorDia) {
          turnosAsignados[turnoNumero]++;
          alert(`Turno asignado: #${turnosAsignados[turnoNumero]} para el día ${nombresDias[turnoNumero]} - Nombre: ${turnoNombre}`);
        } 
        else {
          alert(`No hay más turnos disponibles para el día ${nombresDias[turnoNumero]}`);
        }
      } 
      else {
        alert("Por favor, ingrese un número válido del 1 al 6 para seleccionar un día.");
      }
      
      consulta = prompt(`${turnoNombre}, deseas otro turno? (si/esc)`).toLowerCase();
      
      if (consulta === "si") {
        alert("Estos son nuestros días en los que trabajamos y puedes reservar: \n\n 1- Lunes \n 2- Martes \n 3- Miércoles \n 4- Jueves \n 5- Viernes \n 6- Sábado");
      } 
      else if (consulta !== "esc") {
        alert(`Perfecto ${turnoNombre}, si necesitas otro turno, no dudes en consultar`);
      }
    }
  }
}

turnoSi();