// const rabbitMQInstance = require('./loaders/rabbit')
// const cola = '/dispositivos'

const rabbitMQInstance = require("./loaders/rabbit");

// async function consumer(){
//     const { channel } = await rabbitMQInstance
//     await channel.consume(cola, (mensaje) => {
//         if(mensaje != null){
//             const contenido = mensaje.content.toString()
//             console.log(contenido);
//             channel.ack(mensaje)
//         }
//     })
// }

// consumer()

async function prueba(){
    const { channel } = await rabbitMQInstance;
    const cola = 'mi-cola';
    
    const mensaje = '¡Hola, mundo!';
    
    channel.sendToQueue(cola, Buffer.from(mensaje));
    
    console.log(`Hemos Creado la cola 'mi-cola'`);
    
    channel.consume(cola, (mensaje) => {
        if (mensaje !== null) {
          const contenido = mensaje.content.toString();
          console.log(`Mensaje recibido de la cola ${cola}: ${contenido}`);
      
          // Realiza aquí el procesamiento del mensaje según tus necesidades
      
          channel.ack(mensaje); // Confirmar el procesamiento del mensaje
        }
      });
}
prueba()
