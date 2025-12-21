const filaTablero = 10;
const celdaTablero = 10;

const tamaño = [1, 2, 3, 4, 5];
const orientacion = ['h', 'v'];
var barcos = [];

const tablero = document.getElementById('tablero');

var casillasTocadas = 0;

const inputs = {
    1: document.getElementById('check1b'),
    2: document.getElementById('check2b'),
    3: document.getElementById('check3b'),
    4: document.getElementById('check4b'),
    5: document.getElementById('check5b')
};

document.addEventListener('DOMContentLoaded', function() {
    iniciarTablero();
    colocarBarcos();
    eventoTocar();
    document.getElementById('restart').addEventListener('click', reiniciarJuego);
});

function iniciarTablero() {
    let html = "";

    let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    for (let i = 0; i < filaTablero; i++) {
        html += "<div class='casilla casilla-simb' style='grid-column:1/2; grid-row:" + (i + 1)+ "/" + (i+2) + ";'>" + (i+1) + "</div>";
    }

    html += "<div class='casilla casilla-vacia' style='grid-column:1/2; grid-row:11/12;'></div>";

    for (let i = 0; i < letras.length; i++) {
        html += "<div class='casilla casilla-simb' style='grid-row: 11/12; grid-column:" + (i + 2) + "/" + (i + 3) + ";'>" + letras[i] + "</div>";
    }

    for (let i = 0; i < filaTablero; i++) {
        for (let j = 0;j < celdaTablero; j++) {
            html += "<div id='cell-" + (i+1) + "-" + (j+1) + "' class='casilla casilla-hueco' style='grid-column:" + (j + 2) + "/" + (j+3) + "; grid-row:" + (i + 1) + "/" + (i + 2) + ";'>&nbsp;</div>";
        }
    }
    tablero.innerHTML = html;
}

function colocarBarcos() {
    for (let i = 0; i < tamaño.length; i++) {
        let tam = tamaño[i];
        let colocado = false;

        while (!colocado) {
            let orient = orientacion[Math.floor(Math.random() * orientacion.length)];

            let filaMax = orient == 'v' ? filaTablero - tam + 1 : filaTablero;
            let celdaMax = orient == 'h' ? celdaTablero - tam + 1 : celdaTablero;

            let filaIni = Math.floor(Math.random() * filaMax) + 1;
            let celdaIni = Math.floor(Math.random() * celdaMax) + 1;

            let celdasData = [];
            let valido = true;

            for (let j = 0; j < tam; j++) {
                let f = filaIni;
                let c = celdaIni;

                if (orient == 'v') {
                    f = filaIni + j;
                } else {
                    c = celdaIni + j;
                }
                
                let celdaDOM = getCell(f, c);
                if (!celdaDOM || celdaDOM.classList.contains('barco')) {
                    valido = false;
                    break;
                }
                celdasData.push(celdaDOM.id);
            }

            if (valido) {
                for (let k = 0; k < celdasData.length; k++) {
                    document.getElementById(celdasData[k]).classList.add('barco');
                }

                barcos.push({
                    tamaño: tam,
                    orientacion: orient,
                    celdas: celdasData,
                    tocadas: []
                });
                colocado = true;
            }
        }
    }
}

function eventoTocar() {
    const casillasEvt = document.querySelectorAll('.casilla-hueco');
    
    for (let i = 0; i < casillasEvt.length; i++) {
        let casilla = casillasEvt[i];
        casilla.addEventListener('click', function() {

            if (casilla.classList.contains('marcada')) return;
            casilla.classList.add('marcada');

            casillasTocadas++;

            if (casilla.classList.contains('barco')) {
                casilla.style.background = '#ff667579';

                for (let j = 0; j < barcos.length; j++) {
                    let b = barcos[j];
                    for (let k = 0; k < b.celdas.length; k++) {
                        if (b.celdas[k] == casilla.id) {
                            b.tocadas.push(casilla.id);
                            if (b.tocadas.length == b.tamaño) {
                                inputs[b.tamaño].checked = true;
                                comprobarVictoria();
                            }
                            break;
                        }
                    }
                }
            } else {
                casilla.style.background = '#3a6fa879';
            }
        });
    }
}

function getCell(fila, celda) {
    return document.getElementById("cell-" + fila + "-" + celda);
}

function comprobarVictoria() {
    let todosHundidos = true;
    
    for (let i = 1; i <= 5; i++) {
        if (inputs[i].checked == false) {
            todosHundidos = false;
            break;
        }
    }

    if (todosHundidos) {
        setTimeout(function() {
            alert("¡Felicidades! Has hundido toda la flota.\nNº de casillas tocadas: " + casillasTocadas);
            let verificacion = confirm("¿Quieres jugar de nuevo?");
            if (verificacion) {
                reiniciarJuego();
            }
        }, 200);
    }
}

function reiniciarJuego() {
    window.location.href = './index.html';
}
