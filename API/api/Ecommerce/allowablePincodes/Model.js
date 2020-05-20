const mongoose = require('mongoose');

const allowablePincodeSchema = mongoose.Schema({
	_id			 : mongoose.Schema.Types.ObjectId,    
    "franchiseID" : String,
    "companyID"   : String,
    "alloablePincodes" : String
});

module.exports = mongoose.model('allowablePincode',allowablePincodeSchema);
