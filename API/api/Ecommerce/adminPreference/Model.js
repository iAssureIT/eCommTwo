const mongoose = require('mongoose');

const adminPreferenceSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,    
    "websiteModel"     : String,
    "askPincodeToUser" : String,
    "showLoginAs"      : String,
    createdAt          : Date
});

module.exports = mongoose.model('adminpreference',adminPreferenceSchema);
