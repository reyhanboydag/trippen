const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:Number,
        required:true
    }
});

module.exports= mongoose.model('Vehicle',vehicleSchema);