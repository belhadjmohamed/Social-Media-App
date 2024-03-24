const mongoose  = require('mongoose');



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

const postSchema = mongoose.Schema({
    content : {
        type : String,
        required : true,
    },
    images : {
        type : Array,
        default : []
    },
    likes :[{type : mongoose.Types.ObjectId,ref : 'user'}], 
    commentss :[{type : mongoose.Types.ObjectId,ref : 'comment'}], 
    user : {type : mongoose.Types.ObjectId,ref : 'user'},
    features : {
        type : [featureSchema],
        default : [],
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('post',postSchema);