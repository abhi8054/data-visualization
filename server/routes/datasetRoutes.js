const express = require('express')
const {
    get_data,
    get_needFull_data_for_filter,
    get_filter_data,
} = require('../controller/datasetController')

const route = express.Router()

route.get('/get_data',get_data)
route.get('/get_needFull_data_for_filter',get_needFull_data_for_filter)
route.post('/get_filter_data',get_filter_data)

module.exports = {route}