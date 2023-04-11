const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const vendorDataSchema=new Schema({
 
  VendorID:{
    type: String,
    required: true
  },
  Gender:{
    type: String,
    required: true
  },
  Type:{
    type: String,
    required: true
  },
  Image1:{
    type: String,
    required: true
  },
  Image2:{
    type: String,
    required: true
  },
  Image3:{
    type: String,
    required: true
  },
  Quantity:{
    type: Number,
    required: true
  },
  Price:{
    type: Number,
    required: true
  }


})
const vendordata = mongoose.model("vendordata",vendorDataSchema);

module.exports=vendordata;