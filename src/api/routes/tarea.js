const express = require('express')
const ThreadService = require('../../services/ThreadService')
const router = express.Router()
module.exports = (app) => {
    app.use('/tarea', router)

    const Thread = new ThreadService()

    router.get('/', async (req, res) => {
        Thread.inicializar(1000, 100)
            .then(() => {
                console.log('Hilo funcionando')
            })
            .catch(error => {
                console.error('Error al ejecutar el hilo:', error);
            });
        // for(let i = 0; i < 100; i++){
            
        //     .then(() => {
        //         console.log('Hilo funcionando')
        //     })
        //     .catch(error => {
        //         console.error('Error al ejecutar el hilo:', error);
        //     });
        // }
        
        res.send({
            message: 'Estamos funcionando'
        })
    })
}