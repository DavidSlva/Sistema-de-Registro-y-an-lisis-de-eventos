// hilo.js
const randomWords = require('random-words');

// Genera un párrafo de 5 frases aleatorias
function generarTextoRandom() {
  let texto = '';
  for (let i = 0; i < 5; i++) {
    texto += randomWords({ min: 5, max: 10 }).join(' ') + '. ';
  }
  return texto;
}

// Función que se ejecuta en el hilo de trabajo
function trabajar() {
  // Realizar tareas en el hilo...
  const resultado = randomWords();
  
  // Enviar el resultado de vuelta al hilo principal
  parentPort.postMessage(resultado);
}

// Importar el módulo 'worker_threads' y obtener la referencia al puerto de comunicación con el hilo principal
const { workerData, parentPort } = require('worker_threads');

// Obtener los datos pasados desde el hilo principal
const valorInicial = workerData;

// Ejecutar la función 'trabajar' en el hilo de trabajo, pasando el valor inicial
trabajar(valorInicial);

