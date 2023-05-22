const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092']
})

// Función asincrónica para recibir mensajes del tópico
const receiveMessages = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic: topic,
          value: message.value.toString(),
        })
      },
    })
  };
  
  // Llamada a la función para recibir mensajes
  receiveMessages().catch(console.error);  