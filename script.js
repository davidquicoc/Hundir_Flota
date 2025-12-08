const filaTablero = 10;
const celdaTablero = 10;

const tamaño = [1, 2, 3, 4, 5];
const orientacion = ['h', 'v'];
var barcos = [];

const tablero = document.getElementById('tablero');

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
    document.getElementById('tablero').innerHTML = html;
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

                if (orient == 'h') {
                    c = celdaIni + j;
                } else {
                    f = filaIni + j;
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
                    let celdaDOM = document.getElementById(celdasData[k]);
                    celdaDOM.classList.add('barco'); // marcar como barco (oculto)
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
            if (casilla.classList.contains('barco')) {
                casilla.style.background = 'red';
            } else {
                casilla.style.background = 'gray';
            }
        });
    }
}

function getCell(fila, celda) {
    return document.getElementById("cell-" + fila + "-" + celda);
}

document.getElementById('restart').addEventListener('click', function() {
    window.location.href = './index.html';
});