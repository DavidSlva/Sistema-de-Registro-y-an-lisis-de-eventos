const { Kafka } = require('kafkajs');
const { limpiarArchivo, guardarDatosEnArchivo } = require('../../services/file');
const { categorias } = require('../../CONSTANTS');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092', 'localhost:39092']
})

const OUTPUT_FILE_NAME = 'kafka_output.txt'

// Función asincrónica para recibir mensajes del tópico
const receiveMessages = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    // await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    categorias.map(async (categoria) => {
      console.log(categoria);
      await consumer.subscribe({ topic: categoria, fromBeginning: true })
    })

    let counter = 0;

    let startTime = performance.now()

    limpiarArchivo(OUTPUT_FILE_NAME);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic: topic,
          value: message.value.toString(),
        })
        counter++;
        if(counter%100 === 0){
          let endTime = performance.now();
          let duration = endTime - startTime
          guardarDatosEnArchivo(`${topic},${counter},${duration}\n`,OUTPUT_FILE_NAME)
          console.log(`Se consumieron ${counter} mensajes en ${duration} ms`);
          startTime = performance.now()
        }
      },
    })
  };
  // Llamada a la función para recibir mensajes
  receiveMessages().catch(console.error);  