const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    name:{

        type: String,
        required: true
    },
    email:{

        type:String,
        required:true
    },
    status:{

        type:String,
        required:true
    }

});

module.exports = mongoose.model('Cus',customerSchema);

