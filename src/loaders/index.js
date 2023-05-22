const expressLoader = require("./express")
const initializeRabbitMQ = require("./rabbit")

module.exports = async ({app}) => {
    await expressLoader({app})
}