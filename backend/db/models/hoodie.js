const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HoodieSchema = new Schema({
    title:{
        type:String,
        required: [true, 'The field is required'],
    }
})

const Hoodie = mongoose.model('Hoodie',HoodieSchema)

module.exports = Hoodie