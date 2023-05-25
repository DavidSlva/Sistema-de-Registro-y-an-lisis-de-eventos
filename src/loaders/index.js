const expressLoader = require("./express")
const initializeRabbitMQ = require("./rabbit")
const { startRedis } = require("./redis")

module.exports = async ({app}) => {
    await expressLoader({app})
    await startRedis()
}