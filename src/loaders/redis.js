const redis = require('redis')

const redis = redis.createClient({
    url: 'redis://127.0.0.1:6379'
})
const startRedis = async () => {
    const response1 = await redis.connect()
    console.log('Redis conectado');
}

module.exports = {
    redis,
    startRedis
}