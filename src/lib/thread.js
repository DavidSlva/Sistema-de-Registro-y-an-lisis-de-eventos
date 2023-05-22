const {Worker} = require('worker_threads');

exports.thread = (threadFile, workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(threadFile, {workerData});
        worker.on('message', message => {
            resolve(message)
        });
    
        worker.on('error', error => {
            reject(error);
        });
    
        worker.on('exit', code => {
        if (code !== 0)
            reject(new Error(`El hilo finalizó con un código de salida ${code}`));
        else
            resolve();
        });
    })
}