const mongoose = require('mongoose');

const allowablePincodeSchema = mongoose.Schema({
	_id			       : mongoose.Schema.Types.ObjectId,    
    "franchiseID"      : String,
    "companyID"        : String,
    "allowablePincodes": String,
    createdAt          : Date
});

module.exports = mongoose.model('allowablePincode',allowablePincodeSchema);
