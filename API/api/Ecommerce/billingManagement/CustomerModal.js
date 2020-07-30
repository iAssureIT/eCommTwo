const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
	_id			              : mongoose.Schema.Types.ObjectId,
    customerName              : String,
    mobile                    : Number,
    email                     : String,
    address                   : String,
    franchise_id              : String,  
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
});

module.exports = mongoose.model('franchisecustomers' ,customerSchema);