//  Definir las dimensiones del tablero
const filaTablero = 10;
const celdaTablero = 10;

//  Definir las propiedades de los barcos
const tamaño = [1, 2, 3, 4, 5];
const orientacion = ['h', 'v'];
//  Array para almacenar los objetos de cada barco generado
var barcos = [];

var casillasTocadas = 0;

//  Referencias a los checkboxes del HTML que marcarán los barcos hundidos
const inputs = {
    1: document.getElementById('check1b'),
    2: document.getElementById('check2b'),
    3: document.getElementById('check3b'),
    4: document.getElementById('check4b'),
    5: document.getElementById('check5b')
};

//  Evento de carga, ejecuta las funciones principales una vez que el HTML está listo
document.addEventListener('DOMContentLoaded', function() {
    iniciarTablero();
    colocarBarcos();
    eventoTocar();
    document.getElementById('restart').addEventListener('click', reiniciarJuego);
});

//  Genera el HTML para las coordenadas (letras/números) y las celdas de juego
function iniciarTablero() {
    let html = "";

    let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    //  Columnas de números (Y: 1-10)
    for (let i = 0; i < filaTablero; i++) {
        html += "<div class='casilla casilla-simb' style='grid-column:1/2; grid-row:" + (i + 1)+ "/" + (i+2) + ";'>" + (i+1) + "</div>";
    }
    
    //  Esquina vacía inferior izquierda 
    html += "<div class='casilla casilla-vacia' style='grid-column:1/2; grid-row:11/12;'></div>";

    //  Fila de letras (X: A-J)
    for (let i = 0; i < letras.length; i++) {
        html += "<div class='casilla casilla-simb' style='grid-row: 11/12; grid-column:" + (i + 2) + "/" + (i + 3) + ";'>" + letras[i] + "</div>";
    }

    //  Crear las celdas interactivvas donde se colocarán los barcos
    for (let i = 0; i < filaTablero; i++) {
        for (let j = 0;j < celdaTablero; j++) {
            html += "<div id='cell-" + (i+1) + "-" + (j+1) + "' class='casilla casilla-hueco' style='grid-column:" + (j + 2) + "/" + (j+3) + "; grid-row:" + (i + 1) + "/" + (i + 2) + ";'>&nbsp;</div>";
        }
    }
    document.getElementById('tablero').innerHTML = html;
}

//  Selecciona posiciones aleatorias y verifica que no se solapen ni salgan del tablero
function colocarBarcos() {
    for (let i = 0; i < tamaño.length; i++) {
        let tam = tamaño[i];
        let colocado = false;

        //  Bucle de reintento
        while (!colocado) {
            //  Elegir aleatoriamente una orientación
            let orient = orientacion[Math.floor(Math.random() * orientacion.length)];

            //  Calcula el límite máximo para que el barco no se salga del borde
            let filaMax = orient == 'v' ? filaTablero - tam + 1 : filaTablero;
            let celdaMax = orient == 'h' ? celdaTablero - tam + 1 : celdaTablero;

            let filaIni = Math.floor(Math.random() * filaMax) + 1;
            let celdaIni = Math.floor(Math.random() * celdaMax) + 1;

            let celdasData = [];
            let valido = true;

            //  Verifica si todas las celdas que ocuparía el barco están libres
            for (let j = 0; j < tam; j++) {
                let f = filaIni;
                let c = celdaIni;

                //  Si es vertical, aumenta una fila. Si es horizontal, se aumenta una columna
                if (orient == 'v') {
                    f = filaIni + j;
                } else {
                    c = celdaIni + j;
                }
                
                let celdaDOM = getCell(f, c);
                //  Si la celda no existe o ya tiene la clase .barco, la posición no es válidda
                if (!celdaDOM || celdaDOM.classList.contains('barco')) {
                    valido = false; //  Se sale del for para intentar otra posición aleatoria
                    break;
                }
                celdasData.push(celdaDOM.id);   //  Se guarda el ID de la celda válida
            }

            //  Si la posición es válida, guarda el barco y marca las celdas
            if (valido) {
                for (let k = 0; k < celdasData.length; k++) {
                    document.getElementById(celdasData[k]).classList.add('barco');
                }

                barcos.push({
                    tamaño: tam,
                    orientacion: orient,
                    celdas: celdasData, //  Lista de IDs que pertenecen a este barco
                    tocadas: [] //  Se registra que partes han sido golpeadas
                });
                colocado = true;    //  Terminar el bucle while
            }
        }
    }
}

//  Escucha los clicks en el tablero y determina si es "Agua" o "Tocado"
function eventoTocar() {
    const casillasEvt = document.querySelectorAll('.casilla-hueco');
    
    for (let i = 0; i < casillasEvt.length; i++) {
        let casilla = casillasEvt[i];
        casilla.addEventListener('click', function() {

            //  Evita procesar una casilla ya clicada
            if (casilla.classList.contains('marcada')) return;
            casilla.classList.add('marcada');

            casillasTocadas++;  //  Incrementa el contador de intentos

            if (casilla.classList.contains('barco')) {
                //  Si hay barco, cambia color a rojo
                casilla.style.background = '#ff667579';

                //  Busca a qué barco pertenece la celda clicada
                for (let j = 0; j < barcos.length; j++) {
                    let b = barcos[j];
                    for (let k = 0; k < b.celdas.length; k++) {
                        if (b.celdas[k] == casilla.id) {
                            b.tocadas.push(casilla.id);

                            //  Si todas las celdas del barco están tocadas, marcar como hundido
                            if (b.tocadas.length == b.tamaño) {
                                inputs[b.tamaño].checked = true;
                                comprobarVictoria();
                            }
                            break;
                        }
                    }
                }
            } else {
                //  Si no hay barco, cambia a color azul
                casilla.style.background = '#3a6fa879';
            }
        });
    }
}

//  Obtiene el elemento del DOM de una celda específica usando sus coordenadas
function getCell(fila, celda) {
    return document.getElementById("cell-" + fila + "-" + celda);
}

//  Verifica si todos los checkbox del HTML están marcados
function comprobarVictoria() {
    let todosHundidos = true;
    
    for (let i = 1; i <= 5; i++) {
        if (inputs[i].checked == false) {
            todosHundidos = false;
            break;
        }
    }

    if (todosHundidos) {
        //  setTimeOut para dar 200ms de retraso
        setTimeout(function() {
            alert("¡Felicidades! Has hundido toda la flota.\nNº de casillas tocadas: " + casillasTocadas);
            let verificacion = confirm("¿Quieres jugar de nuevo?");
            if (verificacion) {
                reiniciarJuego();
            }
        }, 200);
    }
}

//  Recarga la página para empezar una partida nueva
function reiniciarJuego() {
    window.location.href = './index.html';
}
