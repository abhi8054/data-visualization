const dataSetModel = require('../model/datasetSchema');

const get_all_start_years = async (req,res) =>{
   const data = await dataSetModel.distinct('start_year')
   res.send(data)
}

const get_all_sector = async (req,res) => {
    const sector = await dataSetModel.distinct('sector')
    res.send(sector)
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
        ...obj
    })
}

const get_filter_data = async (req,res) => {
    const intensity = await dataSetModel.aggregate([
        {
            $match: {
              sector:{$ne:""},
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
              sector:{$ne:""},
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
              sector:{$ne:""},
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
    console.log({
        intensity,
        likelihood,
        relevance
    });
    res.send({
        intensity,
        likelihood,
        relevance
    })
}


module.exports = {
    get_data,
    get_all_sector,
    get_all_start_years,
    get_filter_data
}