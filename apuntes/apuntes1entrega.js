/* let edad = 6 ; //number
let nombre = "Franco"; //string
const IVA = 0.21; //constante
//camelCase = holaMundo
//PascalCase= HolaMundo
let edadNombre = nombre +" "+ edad; 
console.log(edadNombre); */
/* let nombre = prompt("Ingrese su nombre");
let apellido = prompt("Ingrese su apellido");
let edad = Number(prompt("Ingrese su edad")); //Todo lo que se ingreso por un prompt, ingresa como string, es decir texto  . Se utiliza number para volverlo numero
alert(nombre+" "+apellido+" "+edad); */
/* 
let nombre= prompt ("Ingrese Nombre");

let turno= prompt ("Desea gestionar su turno para: service completo duración 40min , service especifico duración 20min , chequeo gral vehiculo duración 5min ");

let gestion= prompt ("Su turno es el # , tiempo estimado de espera: ");  */

/* function mostrarTablaDeMultiplicar(numero) {

    // Verificar si el número es válido
    
    if (isNaN(numero) || numero <= 0) {
    
    alert(“Por favor, ingresa un número válido.”);
    
    return; // Salir de la función si el número no es válido
    
    }
    
    // Crear la tabla de multiplicar
    
    let tabla = “”;
    
    for (let i = 1; i <= 10; i++) {
    
    tabla += `${numero} x ${i} = ${numero * i}\n`; // Añadir cada línea a la tabla
    
    }
    
    // Mostrar la tabla
    
    alert(tabla);
    
    }
    
    // Pedir al usuario que ingrese un número
    
    let numeroUsuario = prompt(“Ingresa un número para ver su tabla de multiplicar:”);
    
    // Convertir la entrada del usuario a un número y llamar a la función
    
    mostrarTablaDeMultiplicar(Number(numeroUsuario));
    // for (let turno = 1; turno <= 7; turno++) {
//   let nombre = prompt("Ingrese su nombre");

//   alert(`Turno: #${turno} Nombre: ${nombre}`);
// }

// alert("volve mañana que ya no hay turno xD"); */


/* 
let turnoNombre = prompt("Serco Lubricantes te da la bienvenida al gestor de turnos online, cual es tu nombre?");
let consulta = prompt(`${turnoNombre}, deseas un turno para que dejemos tu vehiculo en excelente condiciones? \n\n Indique si o bien seleccione "aceptar" de lo contrario escribe "esc"`).toLowerCase();
function respuestaSi () {
    while (consulta !== "esc") {
        if (consulta === "si" || consulta === "") {
            alert("Estos son nuestros turnos y tiempo estimado: \n\n 1- Service Completo(tiempo estimado de trabajo= 40min) \n 2- Service especifico (tiempo estimado de trabajo= 20min) \n 3- Chequeo general (tiempo estimado de trabajo = 15min)");        
        } else {
            alert(`Perfecto ${turnoNombre}, si necesitas otro turno, no dudes en consultar`);
        }
        for (let turno = 1; turno <= 7; turno++) {

              alert(`Turno: #${turno} Nombre: ${turnoNombre}`);
             }
            
            alert("volve mañana que ya no hay turno xD");
    } 
    
}
respuestaSi(); */


/* 
let bienvenida = prompt("Hola bienvenido a KeyboardShop, cual es su nombre?");
let consulta = prompt(`Que tal ${bienvenida} deseas saber el precio de nuestros teclados? \n\n Coloca si o solo dale "Aceptar" de lo contrario escribe "esc"`).toLowerCase();

function respuestaPositiva () {
    while (consulta !== "esc") {
        if (consulta === "si" || consulta === "") {
            alert("Estos son nuestros productos y sus precios: \n\n 1- Redragon Dragonborn: $15.000 \n 2- Redragon Fizz Pro: $20.000 \n 3- T-Dagger Arena: $35.000 \n 4- HyperX AllowFPS: $50.000 \n 5- Corsair Bluetooth: $65.000");        
        } else {
            alert(`Ok ${bienvenida}, si necesitas algo mas, no dudes en consultar!`);
        }
        let presupuesto = parseInt(prompt("Ingrese su presupuesto actual sin puntos ni comas"));
        
        if (presupuesto >= 15000 && presupuesto < 20000) {            
            let comprar = parseInt(prompt(`Tu presupuesto es $${presupuesto} y te alcanza para \n 1) Redragon Dragonborn que cuesta $20.000 \n Si desea comprar seleccione el numero de la lista para realizar la compra`));
            if (comprar === 1) {
                let calculo = presupuesto - 15000;
                alert(`Compraste Redragon Dragonborn, tu vuelto es de ${calculo}`)
            }
        } else if (presupuesto >= 20000 && presupuesto < 35000) {            
            let comprar = parseInt(prompt(`Tu presupuesto es $${presupuesto} y te alcanza para \n 1) Redragon Dragonborn que cuesta $15.000 \n 2) Redragon Fizz Pro que cuesta $20.000 \n Si desea comprar seleccione el numero de la lista para realizar la compra`));
            if (comprar === 1) {
                let calculo = presupuesto - 15000;
                alert(`Compraste Redragon Dragonborn, tu vuelto es de ${calculo}`);                
            } else if ( comprar === 2) {
                let calculo = presupuesto - 20000;
                alert(`Compraste Redragon Fizz Pro, tu vuelto es de ${calculo}`);
            }
        } else if (presupuesto >= 35000 && presupuesto < 50000) {            
            let comprar = parseInt(prompt(`Tu presupuesto es $${presupuesto} y te alcanza para \n 1) Redragon Dragonborn que cuesta $15.000 \n 2) Redragon Fizz Pro que cuesta $20.000 \n 3) T-Dagger Arena que cuesta $35.000 \n Si desea comprar seleccione el numero de la lista para realizar la compra`));
            if (comprar === 1) {
                let calculo = presupuesto - 15000;
                alert(`Compraste Redragon Dragonborn, tu vuelto es de ${calculo}`);                
            } else if ( comprar === 2) {
                let calculo = presupuesto - 20000;
                alert(`Compraste Redragon Fizz Pro, tu vuelto es de ${calculo}`);
            } else if ( comprar === 3) {
                let calculo = presupuesto - 35000;
                alert(`Compraste T-Dagger Arena, tu vuelto es de ${calculo}`);
            }
        } else if (presupuesto >= 50000 && presupuesto < 65000) {            
            let comprar = parseInt(prompt(`Tu presupuesto es $${presupuesto} y te alcanza para \n 1) Redragon Dragonborn que cuesta $15.000 \n 2) Redragon Fizz Pro que cuesta $20.000 \n 3) T-Dagger Arena que cuesta $35.000 \n 4) HyperX AllowFPS que cuesta $50.000 \n Si desea comprar seleccione el numero de la lista para realizar la compra`));
            if (comprar === 1) {
                let calculo = presupuesto - 15000;
                alert(`Compraste Redragon Dragonborn, tu vuelto es de ${calculo}`);                
            } else if ( comprar === 2) {
                let calculo = presupuesto - 20000;
                alert(`Compraste Redragon Fizz Pro, tu vuelto es de ${calculo}`);
            } else if ( comprar === 3) {
                let calculo = presupuesto - 35000;
                alert(`Compraste T-Dagger Arena, tu vuelto es de ${calculo}`);
            } else if ( comprar === 4) {
                let calculo = presupuesto - 50000;
                alert(`Compraste HyperX AllowFPS, tu vuelto es de ${calculo}`);
            }
        } else if (presupuesto >= 65000) {            
            let comprar = parseInt(prompt(`Tu presupuesto es $${presupuesto} y te alcanza para \n 1) Redragon Dragonborn que cuesta $15.000 \n 2) Redragon Fizz Pro que cuesta $20.000 \n 3) T-Dagger Arena que cuesta $35.000 \n 4) HyperX AllowFPS que cuesta $50.000 \n 5) Corsair Bluetooth que cuesta $65.000 \n Si desea comprar seleccione el numero de la lista para realizar la compra`));
            if (comprar === 1) {
                let calculo = presupuesto - 15000;
                alert(`Compraste Redragon Dragonborn, tu vuelto es de ${calculo}`);                
            } else if ( comprar === 2) {
                let calculo = presupuesto - 20000;
                alert(`Compraste Redragon Fizz Pro, tu vuelto es de ${calculo}`);
            } else if ( comprar === 3) {
                let calculo = presupuesto - 35000;
                alert(`Compraste T-Dagger Arena, tu vuelto es de ${calculo}`);
            } else if ( comprar === 4) {
                let calculo = presupuesto - 50000;
                alert(`Compraste HyperX AllowFPS, tu vuelto es de ${calculo}`);
            } else if ( comprar === 5) {
                let calculo = presupuesto - 65000;
                alert(`Compraste Corsair Bluetooth, tu vuelto es de ${calculo}`);
            }            
        }  else {
            alert(`Tu presupuesto actual es de ${presupuesto} no puedes adquirir ninguno de nuestros productos`)
        }
        let seguirComprando = prompt("Quieres seguir comprando?").toLowerCase();
        if (seguirComprando == "si") {
        continue
        } else if (seguirComprando == "no") {
            break;
        }
        
    } 
    
}
respuestaPositiva();

 */



/* let turnoNombre = prompt("Serco Lubricantes te da la bienvenida al gestor de turnos online, cual es tu nombre?");
let consulta = prompt(`${turnoNombre}, deseas un turno para que dejemos tu vehiculo en excelente condiciones? \n\n Indique si o bien seleccione "aceptar" de lo contrario escribe "esc"`).toLowerCase();
function respuestaSi () {
    while (consulta !== "esc") {
        if (consulta === "si" || consulta === "") {
            alert("Estos son nuestros días que trabajamos y puedes reservar: \n\n 1- Lunes \n 2- Martes \n 3- Miércoles \n 4- Jueves \n 5- Viernes \n 6- Sábado");        
        } else {
            alert(`Perfecto ${turnoNombre}, si necesitas otro turno, no dudes en consultar`);
        }
        let turnoNumero = parseInt(prompt("Ingrese el día que desea realizar el chequeo y/o cambio de aceite,filtros de su vehiculo "));
        let turnosDisponibles = 5;
        let turno = 1;
        switch (turnoNumero) {
            case 1:
                // Da el turno
                if (turnosDisponibles > 0) {
                    alert(`Turno asignado: #${turno} Nombre: ${turnoNombre}`);
                    turnosDisponibles--;
                } else {
                    alert("No hay turnos disponibles para hoy");
                }
                // Vuelve al if
                break;
            }
        } 
        alert(prompt(`${turnoNombre}, deseas otro turno? `)).toLowerCase();
    
}
respuestaSi(); */


