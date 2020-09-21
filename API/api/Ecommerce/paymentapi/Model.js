const mongoose = require('mongoose');

const payment = mongoose.Schema({
	_id			              : mongoose.Schema.Types.ObjectId,
    RESPOSE_CODE :String,
    RESPOSE_MESSAGE :String,
    REFERENCE_NO :String,
    status :String,
    createdBy                 : String,
    createdAt                 : Date
});

module.exports = mongoose.model('payment' ,payment);