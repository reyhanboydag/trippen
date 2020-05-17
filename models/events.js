const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const eventShema=new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    vehicle:{
        type:Schema.Types.ObjectId,
        ref:'Vehicle'
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

});
module.exports=mongoose.model('Event',eventShema);