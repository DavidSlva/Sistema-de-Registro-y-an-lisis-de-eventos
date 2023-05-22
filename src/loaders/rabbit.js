let amqp = require('amqplib/callback_api')
const { RABBIT_HOST } = require('../config')

function initializeRabbitMQ() {
    return new Promise((resolve, reject) => {
      amqp.connect(RABBIT_HOST, function(error, connection) {
        if (error) {
          console.error('Error al inicializar RabbitMQ:', error);
          reject(error);
          return;
        }
  
        connection.createChannel(function(error, channel) {
          if (error) {
            console.error('Error al crear el canal de RabbitMQ:', error);
            reject(error);
            return;
          }
  
          resolve({ connection, channel });
        });
      });
    });
  }
  
  const rabbitMQInstance = initializeRabbitMQ();
  
  module.exports = rabbitMQInstance;

  
  
  
  
  
  
  