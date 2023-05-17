const { BASE_IP_SERVER, PORT_SERVER } = require("./config");
const loaders = require("./loaders");
const express = require('express')
const app = express()

async function startServer(){
    await loaders({ app })
    app.listen(PORT_SERVER, (err) => {
        if(err){
            console.log(err);
            return
        }
        console.log("#####################")
        console.log("###### API REST #####")
        console.log("#####################")
        console.log(BASE_IP_SERVER);
    })
}
startServer()