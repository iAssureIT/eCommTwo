const mongoose = require('mongoose');

const projectSettingsSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
    type        : String,
    key         : String,
    secret      : String,
    bucket      : String,
    region      : String,
    authID 		: String,
    authToken 	: String,
    createdBy   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt   : { type: Date, default: Date.now() },
});

module.exports = mongoose.model('projectsettings',projectSettingsSchema);
