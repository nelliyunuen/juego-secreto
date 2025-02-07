
/*
Forma desglosada
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del número secreto'; 

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';

*/

let numeroSecreto = 0;
let intentos = 0;
// declaracion de Array / Ir alamcenando cada uno de los numeros generados para ir preguntando si ese numero ya fue sorteado y no volverlo a jugar
let listaNumerosSorteado = [];
let numeroMaximo = 10;


// Forma optimizada para utilizar y reutilizar las funciones
// La funcion recibe parametros (elemento y texto) - varibales
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; // No es necesario, pero es buna practica colocarlo en las funciones 
}

function verificarIntento(){ // La función es el encapsulamiento de una acción que queremos que haga
    // Validar el intento del usuario
    // En lugar de usar query selector, se usa getElementById para buscar por id
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    // console.log(numeroDeUsuario === numeroSecreto);// indica verdadero o falso 
    /* el triple igual (===) indica que la comparacion de las varibales deben 
    ser igual tanto en valor como variable. Es decir, 1 = 1 y numero es = numero*/
    if(numeroDeUsuario === numeroSecreto){
        // Dentro de una funcion se puede llamara a otra funcion
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        // Se activa el boton de 'Nuevo Juego' eliminando el atributo disabled unicamente cuando se acierta
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        // el usuario no acerto
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

// Limpiar campo de input numero
function limpiarCaja(){
    // Obtener el elemento, por ID con QuerySelector (lleva #)
    // Se da el valor de '' al campo ... (vacio)
    document.querySelector('#valorUsuario').value = '';
}


// FUNCION PARA GENERAR NUMERO ALEATORIO
// Con esta funcion se pueden aplicar otras operaciones, no solo usando JS, elegir un rango diferente, etc
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //console.log(numeroGenerado);
    //console.log(listaNumerosSorteado);
    
    // Si ya sorteamos todos los numeros...
    if(listaNumerosSorteado.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posible');
    } else {
        // Si el numero generado esta incluido en la lista...
        if (listaNumerosSorteado.includes(numeroGenerado)){
            // se retorna el valor de haber llamado a la funcion nuevamente
            return generarNumeroSecreto();
        } else {
            // Se guarda el numero generado en el array
            listaNumerosSorteado.push(numeroGenerado);
            // Se devuelve el valor del numero generado (el cual hasta antes de la verificacion, no existia en el array)
            return numeroGenerado;
        }
    }
    
    
}

function condicionesIniciales(){
    // Mensajes iniciales
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    // Generar el numero aleatorio
    numeroSecreto = generarNumeroSecreto();
    // Inicializar el numero de intentos
    intentos = 1;
}

// Reestart de juego
function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Indicar mensaje de inicio (Intervalos de numeros)
    condicionesIniciales();
    // Deshabilitar el boton nuevamente de 'Nuevo Juego'
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); // Se establece el atributo disabled con el valor true
}

condicionesIniciales();