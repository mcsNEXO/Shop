const express = require('express');
const app = express();
const {port} = require('./config')
const apiRouter = require('./routes/api');

require('./db/mongoose')

app.use('/api/', apiRouter);
app.listen(()=>{
    console.log(`Server is listining in port ${port}`)
})