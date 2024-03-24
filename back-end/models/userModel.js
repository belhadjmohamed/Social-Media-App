const mongoose = require('mongoose');




const featureSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Feature'],
      default: 'Feature',
    },
    geometry: {
      type: {
        type: String,
        required: true,
      },
      coordinates: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
    properties: {},
  }, { _id: false });


const userSchema = mongoose.Schema({
    username:{
        type : String,
        trim : true,
        unique : true,
        maxlength : 25,
        required : true,
    },
    fullname :{
        type : String,
        trim : true,
        max : 25,
        required : true,
        maxlength : 25,
    },
    email : {
        type : String,
        trim : true,
        required: true,
    },
    password : {
        type :String,
        required : true
    },
    address : {
        type : String,
        default : "",
    },
    website :{
        type : String,
        default : '',  
    },
    avatar : {
        type : String,
        default : ''
    },
    gender : {
        type : String,
        default:'male',
    },
    phone : {
        type:String,
        default:'',
    },
    avatar : {
        type : String,
        default:''
    },
    story : {
        type : String,
        default:'',
        maxlength : 200,
    },
    saved : [{type : mongoose.Types.ObjectId,ref:'post'}],  
    friends : [{type : mongoose.Types.ObjectId,ref:'user'}],
    following : [{type : mongoose.Types.ObjectId,ref:'user'}],
    features : {
        type : [featureSchema],
        default : [],
    }
},{
    timestamps:true,
})

module.exports =mongoose.model('user' , userSchema);