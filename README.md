# Sistema de registro y análisis de eventos en tiempo real

## Instalación
- Se debe hacer un clone del repositorio y/o sincronizar el contenido
- Se debe ejecutar el docker-compose `docker-compose up -d` en el directorio

## Ejecución Parte 1
### Ejecución con Rabbit
- `node 'src/parte 1/rabbit/consumer'` Para ejecutar el consumer
- `node 'src/parte 1/rabbit/producer'` Para ejecutar el producer
### Ejecución con kafka
- `node 'src/parte 1/kafka/consumer'` Para ejecutar el consumer
- `node 'src/parte 1/kafka/producer'` Para ejecutar el producer
- - Esta parte seguramente dará warnings, no entiendo aún por qué

## Problema 
- Tenemos una aplicación web o móvil que genera eventos en tiempo real a medida que los usuarios interactúan con ella. Estos eventos pueden ser acciones como clics, navegación, compras, etc. Quieres registrar y analizar estos eventos de manera eficiente y en tiempo real, utilizando colas de mensajes y simulando dispositivos IoT.

## Producers
- En este escenario, puedes simular n dispositivos IoT como hilos, donde cada hilo representa un usuario o una sesión de usuario. Cada hilo genera eventos de forma periódica y los envía al servicio central a través de una cola de mensajes. El intervalo de generación de eventos se establece en el archivo JSON adjunto a cada hilo.

## Consumers
- Por otro lado, tendrías m consumidores que reciben los eventos de la cola de mensajes y los procesan. Estos consumidores pueden ser hilos separados o procesos independientes que leen los eventos de la cola y realizan acciones como almacenamiento en una base de datos, generación de estadísticas en tiempo real o envío de notificaciones.

## Solución
- El sistema debe garantizar que los eventos se registren y analicen en el orden en que se generan, lo que permite una comprensión precisa de las interacciones de los usuarios y una respuesta rápida a los eventos importantes. Utilizando colas de mensajes y la simulación de dispositivos IoT, puedes gestionar eficientemente grandes cantidades de eventos y asegurar su procesamiento en tiempo real.