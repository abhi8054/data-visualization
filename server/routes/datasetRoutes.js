const express = require('express')
const {
    get_data,
    get_all_sector,
    get_all_start_years,
    get_filter_data
} = require('../controller/datasetController')

const route = express.Router()

route.get('/get_data',get_data)
route.get('/get_all_topic',get_all_sector)
route.get('/get_all_start_years',get_all_start_years)
route.post('/get_filter_data',get_filter_data)

module.exports = {route}