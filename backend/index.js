const express = require('express')
const app = express()
const {port} = require('./config')
const apiRouter = require('./routes/api')
require('./db/mongoose')


app.use('/api/',apiRouter)

app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}`)
})