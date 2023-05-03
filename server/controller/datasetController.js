const dataSetModel = require('../model/datasetSchema');

const get_needFull_data_for_filter = async (req,res) =>{
    const sector = await dataSetModel.distinct('sector')
    const topic = await dataSetModel.distinct('topic')
    const start_year = await dataSetModel.distinct('start_year')
    const region = await dataSetModel.distinct('region')
    const pestle = await dataSetModel.distinct('pestle')
    const source = await dataSetModel.distinct('source')
    const country = await dataSetModel.distinct('country')
    res.send({
        sector,
        topic,
        start_year,
        region,
        pestle,
        source,
        country
    })
}


const get_data = async (req,res) =>{

    const intensity = await dataSetModel.aggregate([
        {
            $match: {
              sector:{$ne:""}
            }
        },
        {   
            $group : {
                _id:"$sector", 
                sum:{$sum:"$intensity"}
            }
        },
        {
            $sort: {
              sum: 1
            }
        }
    ])
    const likelihood = await dataSetModel.aggregate([
        {
            $match: {
              sector:{$ne:""}
            }
        },
        {   
            $group : {
                _id:"$sector", 
                sum:{$sum:"$likelihood"}
            }
        },
        {
            $sort: {
              sum: 1
            }
        }
    ])
    const relevance = await dataSetModel.aggregate([
        {
            $match: {
              sector:{$ne:""}
            }
        },
        {   
            $group : {
                _id:"$sector", 
                sum:{$sum:"$relevance"}
            }
        },
        {
            $sort: {
              sum: 1
            }
        }
    ])

    const region = await dataSetModel.aggregate([
        {
            $match: {
              region:{$ne:""}
            }
        },
        {   
            $group : {
                _id:"$region", 
                count:{$sum:1}
            }
        },
        {
            $sort: {
              count: 1
            }
        }
    ])

    const country = await dataSetModel.aggregate([
        {
            $match: {
              country:{$ne:""}
            }
        },
        {   
            $group : {
                _id:"$country", 
                count:{$sum:1}
            }
        },
        {
            $sort: {
              count: 1
            }
        }
    ])

    const topic = await dataSetModel.aggregate([
        {
            $match: {
              topic:{$ne:""}
            }
        },
        {   
            $group : {
                _id:"$topic", 
                count:{$sum:1}
            }
        },
        {
            $sort: {
              count: 1
            }
        }
    ])

    const data = await dataSetModel.aggregate([
        {
            $match: {
              end_year:2022
            }
        },
        {   
            $group : {
                _id:"$end_year", 
                likelihood:{$sum:"$likelihood"},
                relevance:{$sum:"$relevance"},
                intensity:{$sum:"$intensity"},
            }
        },
        {
            $sort: {
              sum: 1
            }
        }
    ])

    const obj = {
        i:data[0].intensity,
        r:data[0].relevance,
        l:data[0].likelihood
    }

    res.send({
        intensity,
        likelihood,
        relevance,
        region,
        country,
        topic,
        ...obj
    })
}

const get_filter_data = async (req,res) => {
  
    if(Object.keys(req.body).includes('start_year')){
        req.body.start_year = parseInt(req.body.start_year)
    }

    const intensity = await dataSetModel.aggregate([
        {
            $match: {
              ...req.body,
            }
        },
        {   
            $group : {
                _id:"$sector", 
                sum:{$sum:"$intensity"}
            }
        }
        
    ])
    const likelihood = await dataSetModel.aggregate([
        {
            $match: {
              ...req.body,
            }
        },
        {   
            $group : {
                _id:"$sector", 
                sum:{$sum:"$likelihood"}
            }
        }
        
    ])
    const relevance = await dataSetModel.aggregate([
        {
            $match: {
              ...req.body,
            }
        },
        {   
            $group : {
                _id:"$sector", 
                sum:{$sum:"$relevance"}
            }
        }
        
    ])
    const topic = await dataSetModel.aggregate([
        {
            $match: {
                ...req.body,
            }
        },
        {   
            $group : {
                _id:"$topic", 
                count:{$sum:1}
            }
        },
    ])
    res.send({
        intensity,
        likelihood,
        relevance,
        topic
    })
}


module.exports = {
    get_data,
    get_needFull_data_for_filter,
    get_filter_data,
}