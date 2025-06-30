// Sección Adivina la Letra
const codigoAsciiDiv = document.getElementById('codigo-ascii');
const opcionesDiv = document.getElementById('opciones');
const respuestaAdivina = document.getElementById('respuesta-adivina');
const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function generarPreguntaAdivina() {
    const letraAleatoria = letras [Math.floor(Math.random() * letras.length)];
    const codigoAleatorio = letraAleatoria.charCodeAt(0);
    codigoAsciiDiv.textContent = codigoAleatorio;
    opcionesDiv.innerHTML = '';
    const opcionesMezcladas = [...letras].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!opcionesMezcladas.includes(letraAleatoria)) {
        opcionesMezcladas [Math.floor(Math.random() * opcionesMezcladas.length)] = letraAleatoria;
        opcionesMezcladas.sort(() => Math.random() - 0.5);
    }
    opcionesMezcladas.forEach(letra => {
        const boton = document.createElement('button');
        boton.textContent = letra;
        boton.addEventListener('click', () => verificarRespuestaAdivina(letra, letraAleatoria));
        opcionesDiv.appendChild(boton);
    });
}

function verificarRespuestaAdivina(seleccionada, correcta) {
    if (seleccionada === correcta) {
        respuestaAdivina.textContent = '¡Correcto!';
    } else {
        respuestaAdivina.textContent = `Incorrecto. La respuesta era ${correcta}.`;
    }
    setTimeout(generarPreguntaAdivina, 1500);
}

// Sección Escribe con ASCII
const palabraEscribirDiv = document.getElementById('palabra-escribir');
const inputsAsciiDiv = document.getElementById('inputs-ascii');
const verificarEscrituraBtn = document.getElementById('verificar-escritura');
const respuestaEscribe = document.getElementById('respuesta-escribe');
const palabras = ['HOLA', 'CODIGO', 'WEB', 'JUEGO'];
let palabraActual = '';

function generarPreguntaEscribe() {
    palabraActual = palabras [Math.floor(Math.random() * palabras.length)];
    palabraEscribirDiv.textContent = palabraActual;
    inputsAsciiDiv.innerHTML = '';
    for (let i = 0; i < palabraActual.length; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.maxLength = 3;
        inputsAsciiDiv.appendChild(input);
    }
}

verificarEscrituraBtn.addEventListener('click', () => {
    const inputs = inputsAsciiDiv.querySelectorAll('input');
    let correcta = true;
    inputs.forEach((input, index) => {
        const codigoIngresado = parseInt(input.value);
        const codigoCorrecto = palabraActual.charCodeAt(index);
        if (codigoIngresado !== codigoCorrecto) {
            correcta = false;
        }
    });

    if (correcta) {
        respuestaEscribe.textContent = '¡Correcto! ¡Bien hecho!';
    } else {
        respuestaEscribe.textContent = `Incorrecto. Intenta de nuevo.`;
    }
    setTimeout(generarPreguntaEscribe, 2500);
});

// Sección El Mensaje Secreto
const mensajeCodificadoDiv = document.getElementById('mensaje-codificado');
const mensajeDescifradoInput = document.getElementById('mensaje-descifrado');
const decodificarBtn = document.getElementById('decodificar');
const respuestaSecreto = document.getElementById('respuesta-secreto');
const mensajesSecretos = [
    '72 111 108 97', // Hola
    '65 115 99 105 105', // Ascii
    '77 97 103 105 97' // Magia
];
let mensajeActualCodificado = '';

function generarMensajeSecreto() {
    mensajeActualCodificado = mensajesSecretos [Math.floor(Math.random() * mensajesSecretos.length)];
    mensajeCodificadoDiv.textContent = mensajeActualCodificado;
    mensajeDescifradoInput.value = '';
    respuestaSecreto.textContent = '';
}

decodificarBtn.addEventListener('click', () => {
    const codigos = mensajeActualCodificado.split(' ');
    let mensajeDescifrado = '';
    for (const codigo of codigos) {
        mensajeDescifrado += String.fromCharCode(parseInt(codigo));
    }

    if (mensajeDescifradoInput.value.toUpperCase() === mensajeDescifrado.toUpperCase()) {
        respuestaSecreto.textContent = '¡Mensaje descifrado correctamente!';
    } else {
        respuestaSecreto.textContent = `Intenta de nuevo. El mensaje era: ${mensajeDescifrado}`;
    }
    setTimeout(generarMensajeSecreto, 2500);
});

// Inicializar los juegos
generarPreguntaAdivina();
generarPreguntaEscribe();
generarMensajeSecreto();