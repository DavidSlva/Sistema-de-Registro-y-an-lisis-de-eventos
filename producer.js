// hilo.js
const randomWords = require('random-words');
const { workerData, parentPort } = require('worker_threads');

// Función para generar un número aleatorio entre un rango dado
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Genera un párrafo de frases aleatorias con una longitud también aleatoria
function generarTextoRandom(minPalabras) {
  const numFrases = getRandomNumber(3, 7); // Número de frases aleatorias
  const frases = [];
  for (let i = 0; i < numFrases; i++) {
    const numPalabras = getRandomNumber(minPalabras, 10); // Número de palabras aleatorias por frase
    frases.push(randomWords({ min: numPalabras, max: numPalabras }).join(' '));
  }
  return frases.join('. ') + '.';
}

// Función que se ejecuta en el hilo de trabajo
function trabajar(timestamp, minPalabras) {
  setInterval(() => {
    const resultado = {
      timestamp: timestamp,
      value: generarTextoRandom(minPalabras)
    };
    parentPort.postMessage(resultado);
  }, timestamp); // Intervalo de tiempo aleatorio entre envíos (entre 1 y 5 segundos)
}

// Obtener los datos pasados desde el hilo principal
const { timestamp, minPalabras } = workerData;

// Ejecutar la función 'trabajar' en el hilo de trabajo, pasando los datos necesarios
trabajar(timestamp, minPalabras);