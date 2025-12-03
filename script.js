//  Variables globales
var filaTablero = 10;
var celdaTablero = 10;
var barcoTot = 10;

//  Arrays con datos para los barcos
var barcTamañ = [1, 1, 1, 1, 2, 2, 3, 3, 4, 5];
var barcOrient = ['h', 'v'];
//  Array que almacena barcos
var barcoPosic = [];

/*
var n_intentos = 50;
document.getElementById('intento').value = n_intentos;
*/

//  Tablero
const tablero = document.getElementById('tablero');

//  Checkbox de comprobación
const input1 = document.getElementById('check1b');
const input2 = document.getElementById('check2b');
const input3 = document.getElementById('check3b');
const input4 = document.getElementById('check4b');
const input5 = document.getElementById('check5b');

//  Iniciar eventos de tablero y barcos
document.addEventListener('DOMContentLoaded', function() {
    iniciarTablero();
    //colocarBarcos();
    inicializarEvento();
});

//  Construye el #tablero con sus bloques
function iniciarTablero() {
    //  Variable que guarda la estructura HTML de dentro del #tablero
    let html = "";

    let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    //  Insertar fila de números
    for (let i = 0; i < filaTablero; i++) {
        html += "<div class='casilla casilla-simb' style='grid-column:1/2; grid-row:" + (i + 1)+ "/" + (i+2) + ";'>" + (i+1) + "</div>";
    }

    //  Añadir casilla vacía
    html += "<div class='casilla casilla-vacia' style='grid-column:1/2; grid-row:11/12;'></div>";

    //  Insertar columnas de letras
    for (let i = 0; i < letras.length; i++) {
        html += "<div class='casilla casilla-simb' style='grid-row: 11/12; grid-column:" + (i + 2) + "/" + (i + 3) + ";'>" + letras[i] + "</div>";
    }

    //  Insertar casillas restantes 
    for (let i = 0; i < filaTablero; i++) {
        for (let j = 0;j < celdaTablero; j++) {
            html += "<div id='cell-" + (i+1) + "-" + (j+1) + "' class='casilla casilla-hueco' style='grid-column:" + (j + 2) + "/" + (j+3) + "; grid-row:" + (i + 1) + "/" + (i + 2) + ";'>&nbsp;</div>";
        }
    }
    //  Añadir html en #tablero
    document.getElementById('tablero').innerHTML = html;
}

/*

EN DESARROLLO

function colocarBarcos() {
    for (let i = 0; i < barcoTot; i++) {
        let tamaño = barcTamañ[i];
        let colocado = false;

        while (!colocado) {
            let orient = barcOrient[Math.floor(Math.random() * barcOrient.length)];
            let fila = Math.floor(Math.random() * filaTablero) + 1;
            let celd = Math.floor(Math.random() * celdaTablero) + 1;

            let posiciones = [];
            for (let j = 0; j < tamaño; j++) {
                let f = fila;
                let c = celd;
                if (orient == 'h') {
                    c += j;
                } else {
                    f += j;
                }
                
            }
        }
    }
}
*/

function inicializarEvento() {
    //  Variable que obtiene todas las casillas
    let casillas = document.querySelectorAll(".casilla-hueco");
    //  Bucle que recorre cada casilla hasta a veriguar cual hizo la función de click
    for (let i = 0; i < casillas.length; i++) {
        let casilla = casillas[i];
        casilla.addEventListener('click', function() {
            //  Cambiar fondo de color de la casilla
            casilla.style.background = "#30466e";
        });
    }
}

function comprobarBarco() {
    /*if ()*/
}

//  Botón #restart hará la función restartGame() cuando se clickee en él
document.getElementById('restart').addEventListener('click', restartGame);

//  Refirige a index.html
function restartGame() {
    window.location.href = "index.html";
}
