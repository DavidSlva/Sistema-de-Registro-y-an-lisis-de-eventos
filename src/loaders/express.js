const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path');
const { PREFIX } = require('../config');
const routes = require('../api');

module.exports = ({ app = express()}) => {

    app.use(express.urlencoded({ extended: false, limit: '200mb' }))
    app.use(express.json({limit: '200mb'}))
    app.use(morgan('dev'))

    app.use(cors())

    app.use((err, req, res, next) => {
        console.log("ERROR: ", err.message);
        return res.status(err.status || 500).json(err.message)
    })

    app.use(PREFIX, routes())

    return app
}