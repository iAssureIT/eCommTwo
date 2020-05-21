const mongoose = require('mongoose');

const adminPreferenceSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,    
    website : {
        "websiteModel" : String
    },
});

module.exports = mongoose.model('adminpreference',adminPreferenceSchema);
