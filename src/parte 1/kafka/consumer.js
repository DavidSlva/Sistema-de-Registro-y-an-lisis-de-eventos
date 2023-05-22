const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092', 'localhost:39092']
})

// Función asincrónica para recibir mensajes del tópico
const receiveMessages = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    let counter = 0;
    console.time('element')

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // console.log({
        //   topic: topic,
        //   value: message.value.toString(),
        // })
        counter++;
        if(counter%100 === 0){
          console.log(`Se consumieron ${counter} mensajes`);
          console.timeEnd('element')
          console.time('element')
        }
      },
    })
    console.timeEnd('element')
  };
  // Llamada a la función para recibir mensajes
  receiveMessages().catch(console.error);  