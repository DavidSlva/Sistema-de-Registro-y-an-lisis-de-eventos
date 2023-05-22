const API_VERSION = process.env.API_VERSION || "v1"
const IP_SERVER = process.env.IP_SERVER || 'localhost'
const PORT_SERVER = process.env.PORT_SERVER || 8000
const BASE_IP_SERVER = `http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/` //MALISIMO
const PREFIX = `/api/${API_VERSION}`

const RABBIT_HOST = 'amqp://localhost:5672'

const COLA_GENERAL = 'cola-general'
const FILE_THREAD = './producer.js'
module.exports = {
    PREFIX,
    API_VERSION,
    IP_SERVER,
    PORT_SERVER,
    BASE_IP_SERVER,
    RABBIT_HOST,
    COLA_GENERAL,
    FILE_THREAD
}