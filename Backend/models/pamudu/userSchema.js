const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    user:{

        type:String,
        required:true
    },

    email:{

        type:String,
        required:true,
        unique : true
    },

    password:{

        type:String,
        required:true
    },

    firstname:{

        type:String,
        required:true
    },
    lastname:{

        type:String,
        required:true
    },
    address:{

        type:String,
        required:true
    },
    telephone:{

        type:Number,
        required: true
    },

    userType:{

        type: String,
    },
})

const collection = mongoose.model('collection',userSchema);

module.exports = collection