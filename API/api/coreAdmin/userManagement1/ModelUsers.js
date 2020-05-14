const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	createdAt	: {type:Date},
	createdBy	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	services	: {
		password:{
					bcrypt:String
				  },
		resume: {
			loginTokens:[
				{
					whenLogin: Date,
					whenLogout: Date,
					ValidateTill: Date,
					hashedToken : String
				}
			]
		}
	},
	username	: {type:String},
	profile 	:
					{
						company_id 				: { type: mongoose.Schema.Types.ObjectId, ref: 'companysettings' },
						companyID 				: Number,
						firstname 				: String,
						lastname  				: String,
						fullName  				: String,
						mobile 		 			: String,
						image 					: String,
						otpMobile	  			: String,
						mobileVerified			: Boolean,
						email 					: String,
						otpEmail	  			: String,
						emailVerified			: Boolean,
						status					: String,
						createdOn 				: String,
					},
	roles : [String],
});

module.exports = mongoose.model('users',userSchema);
