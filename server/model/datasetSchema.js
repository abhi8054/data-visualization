const mongoose = require('mongoose');

const dataSetSchema = mongoose.Schema({
    end_year: {
        type:String,
        required:true,
        default:""
    },
    intensity: {
        type:Number,
        required:true
    },
    sector: {
        type:String,
        required:true,
        default:""
    },
    topic: {
        type:String,
        required:true,
        default:""
    },
    insight: {
        type:String,
        required:true,
        default:""
    },
    url: {
        type:String,
        required:true,
        default:""
    },
    region: {
        type:String,
        required:true,
        default:""
    },
    start_year: {
        type:String,
        required:true,
        default:""
    },
    impact: {
        type:String,
        required:true,
        default:""
    },
    added: {
        type:String,
        required:true,
        default:""
    },
    published: {
        type:String,
        required:true,
        default:""
    },
    country: {
        type:String,
        required:true,
        default:""
    },
    relevance: {
        type:Number,
        required:true
    },
    pestle: {
        type:String,
        required:true,
        default:""
    },
    source: {
        type:String,
        required:true,
        default:""
    },
    title: {
        type:String,
        required:true,
        default:""
    },
    likelihood: {
        type:String,
        required:true,
        default:""
    },
})

const dataSetModel = mongoose.model("dataset",dataSetSchema)

module.exports = dataSetModel