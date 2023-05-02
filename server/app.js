const express = require("express");
const dbConnection =  require("./config/dbConnection");
const { route } = require("./routes/datasetRoutes");
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use('/dataset',route);

(async function(){
    try{
        await dbConnection()
        app.listen(5000,() =>{
            console.log(`Server started at ${5000}`)
            console.log(`Database Connected Successfully`)
        })
    }catch(e){
        console.log(e.message)
    }
})();


