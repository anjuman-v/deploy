const express = require('express')
const cors = require('cors')
// require('dotenv').configs();
const mongoConnector = require('./configs/db')

const flatController = require('./controller/flat.controller');

const app = express();

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 8000

app.use('/', flatController)

module.exports = () => {

    app.listen(PORT, async () => {
        try{
            await mongoConnector()
            console.log('listenning on port ' + PORT)
        }
        catch ( error ) {
            console.log({
                message : error.message,
                status : "something went wrong.."
            })
        }
    })
}