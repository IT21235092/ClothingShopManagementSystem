const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const vendorSchema=new Schema({
 
    userType:{
        type: String
    },
    OrganizationName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone_no:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        
    },
    password:{
        type: String,
        required: true
    },
     date:{
        type: String,
       
    }
    

})
const vendor = mongoose.model("vendor",vendorSchema);

module.exports=vendor;