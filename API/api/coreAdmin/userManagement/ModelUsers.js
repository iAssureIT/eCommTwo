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
					loginTimeStamp: Date,
					logoutTimeStamp: Date,
					ValidateTill: Date,
					hashedToken : String
				}
			]
		}
	},
	username	: {type:String},
	profile 	:
					{
						company_id 				: { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
						companyID 				: Number,
						companyName  			: String,
						firstname 				: String,
						lastname  				: String,
						fullName  				: String,
						mobile 		 			: String,
						image 					: String,
						otpMobile	  			: String,
						mobileVerified			: Boolean,
						email 					: String,
						otpEmail	  			: String,
						otpMobile	  			: String,
						emailVerified			: Boolean,
						mobileVerified			: Boolean,
						status					: String,
						createdOn 				: String,
					},
	roles       : [String],
	statusLog   : [
	                {
	                	status 				: String,
	                    updatedAt           : Date,
	                    updatedBy           : String,
	                }
	            ]
});

module.exports = mongoose.model('users',userSchema);
