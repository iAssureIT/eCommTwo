const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectID = require('mongodb').ObjectID;
var request = require('request-promise');
const User = require('../userManagement/ModelUsers.js');
const Role = require('../rolesManagement/ModelRoles.js');
const globalVariable = require("../../../nodemon.js");


function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.user_signup_user = (req, res, next) => {
	console.log("user_signup_user ", req.body);
	if (req.body.email && req.body.pwd && req.body.role) {
		var emailId = req.body.email;
		var role_lower = (req.body.role).toLowerCase();
		console.log("role ", role_lower);
		if (role_lower && emailId) {
			Role.findOne({ role: role_lower })
				.exec()
				.then(role => {
					if (role) {
						User.find({ "username": emailId.toLowerCase() })
							.exec()
							.then(user => {
								if (user.length > 0) {
									return res.status(200).json({
										message: 'Email Id already exits.'
									});
								} else {
									bcrypt.hash(req.body.pwd, 10, (err, hash) => {
										if (err) {
											return res.status(500).json({
												message: "Failed to match the password",
												error: err
											});
										} else {
											const user = new User({
												_id: new mongoose.Types.ObjectId(),
												createdAt: new Date,
												services: {
													password: {
														bcrypt: hash

													},
												},
												username: emailId.toLowerCase(),
												profile: {
													firstname: req.body.firstname,
													lastname: req.body.lastname,
													fullName: req.body.firstname + ' ' + req.body.lastname,
													email: emailId.toLowerCase(),
													mobile: req.body.mobNumber,
													companyID: req.body.companyID,
													createdAt: new Date(),
													status: req.body.status ? req.body.status : "Block",
													createdBy: req.body.createdBy,
												},
												roles: [role_lower]
											});
											if (!req.body.firstname) {
												user.profile.fullName = req.body.fullName;
											}
											user.save()
												.then(result => {
													res.status(200).json({
														message: 'USER_CREATED',
														ID: result._id,
													})
												})
												.catch(err => {
													console.log(err);
													res.status(500).json({
														message: "Failed to save User Details",
														error: err
													});
												});
										}
									});
								}
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									message: "Failed which finding the User",
									error: err
								});
							});
					} else {
						res.status(200).json({ message: "Role does not exits" });
					}
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						message: "Failed when trying to find Role",
						error: err
					});
				});
		}
	} else {
		res.status(200).json({ message: "Email, pwd and role are mandatory" });
	}
};
exports.user_signup_user_email_otp = (req, res, next) => {
	console.log('req.body.email', req.body.email);
	if (req.body.email && req.body.pwd && req.body.role) {
		var emailId = req.body.email;
		var userRole = (req.body.role).toLowerCase();
		if (userRole && emailId) {
			Role.findOne({ role: userRole })
				.exec()
				.then(role => {
					if (role) {
						User.find({ "username": emailId.toLowerCase() })
							.exec()
							.then(user => {
								if (user.length > 0) {
									return res.status(200).json({
										message: 'Email Id already exits.'
									});
								} else {
									bcrypt.hash(req.body.pwd, 10, (err, hash) => {
										if (err) {
											return res.status(500).json({
												message: "Failed to match the password",
												error: err
											});
										} else {
											var emailOTP = getRandomInt(1000, 9999);
											if (emailOTP) {
												const user = new User({
													_id: new mongoose.Types.ObjectId(),
													createdAt: new Date,
													services: {
														password: {
															bcrypt: hash

														},
													},
													username: emailId.toLowerCase(),
													profile:
													{
														firstname: req.body.firstname,
														lastname: req.body.lastname,
														fullName: req.body.firstname + ' ' + req.body.lastname,
														email: emailId.toLowerCase(),
														mobile: req.body.mobNumber,
														createdAt: new Date(),
														otpEmail: emailOTP,
														status: "active",
														// status: req.body.status ? req.body.status : "Inactive",
														createdBy: req.body.createdBy,
													},
													roles: [userRole]
												});
												if (!req.body.firstname) {
													user.profile.fullName = req.body.fullName;
												}
												user.save()
													.then(result => {
														if (result) {
															res.status(200).json({ message: "USER_CREATED", ID: result._id })
															// console.log("req.body.email:",req.body.email);
															// request({
															// 	"method": "POST",
															// 	"url": "http://localhost:" + globalVariable.port + "/send-email",
															// 	"body": {
															// 		email: req.body.email,
															// 		subject: req.body.emailSubject,
															// 		text: req.body.emailContent + " Your OTP is " + emailOTP,
															// 	},
															// 	"json": true,
															// 	"headers": {
															// 		"User-Agent": "Test Agent"
															// 	}
															// })
															// .then(source => {
															// 		res.status(200).json({ message: "USER_CREATED", ID: result._id })
															// })
															// .catch(err => {
															// 	console.log(err);
															// 	res.status(500).json({
															// 		message: "Failed to Send Email",
															// 		error: err
															// 	});
															// });
														} else {
															res.status(200).json({ message: "USER_NOT_CREATED" })
														}
													})
													.catch(err => {
														console.log(err);
														res.status(500).json({
															message: "Failed to save User Details",
															error: err
														});
													});
											}
										}
									});
								}
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									message: "Failed which finding the User",
									error: err
								});
							});
					} else {
						res.status(200).json({ message: "Role does not exits" });
					}
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						message: "Failed when trying to find Role",
						error: err
					});
				});
		}
	} else {
		res.status(200).json({ message: "Email, pwd and role are mandatory" });
	}
};
exports.check_userID_EmailOTP = (req, res, next) => {
	User.find({ _id: ObjectID(req.params.ID), "profile.otpEmail": req.params.emailotp })
		.exec()
		.then(data => {
			if (data.length > 0) {
				User.updateOne(
					{ _id: ObjectID(req.params.ID) },
					{
						$set: {
							"profile.otpEmail": 0,
							"profile.status": "active"
						}
					}
				)
					.exec()
					.then(data => {
						if (data.nModified === 1) {
							res.status(200).json({ message: "SUCCESS", userID: data._id });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Email OTP",
							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};
exports.check_username_EmailOTP = (req, res, next) => {
	console.log("req.parmas", req.params);
	User.find({ username: req.params.username, "profile.otpEmail": req.params.emailotp })
		.exec()
		.then(data => {
			if (data.length > 0) {
				User.updateOne(
					{
						username: req.params.username
					},
					{
						$set: {
							"profile.otpEmail": 0,
							"profile.status": "active"
						}
					}
				)
					.exec()
					.then(data => {
						if (data.nModified === 1) {
							res.status(200).json({ message: "SUCCESS" });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Email OTP",
							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};
exports.user_login = (req, res, next) => {
	var emailId = (req.body.email).toLowerCase();
	var role = (req.body.role).toLowerCase();	

	console.log('user_login = ', req.body);

	User.findOne({
		"username": emailId,
		"roles": role,
		// "profile.status"	: "active",
	})
		.exec()
		.then(user => {
			if (user) {
				if ((user.profile.status).toLowerCase() === "active") {
					var pwd = user.services.password.bcrypt;
					console.log('pwd', pwd);
					if (pwd) {
						bcrypt.compare(req.body.password, pwd, (err, result) => {
							if (err) {
								return res.status(200).json({
									message: 'Auth failed'
								});
							}
							if (result) {
								const token = jwt.sign({
									email: req.body.email,
									userId: user._id,
								}, globalVariable.JWT_KEY,
									{
										expiresIn: "365d"
									}
								);
								
								User.updateOne(
									{ "username": emailId.toLowerCase() },
									{
										$push: {
											"services.resume.loginTokens": {
												whenLogin: new Date(),
												hashedToken: token
											}
										}
									}
								)
									.exec()
									.then(updateUser => {
										
												if (updateUser.nModified == 1) {
													res.status(200).json({
														message: 'Login Auth Successful',
														token: token,
														roles: user.roles,
														ID: user._id,
														companyID: user.profile.companyID,
														userDetails: {
															firstName: user.profile.firstname,
															lastName: user.profile.lastname,
															email: user.profile.email,
															phone: user.profile.phone,
															city: user.profile.city,
															companyID: user.profile.companyID,
															locationID: user.profile.locationID,
															user_id: user._id,
															roles: user.roles,
															token: token,
														}
													});
												} else {
													return res.status(200).json({
														message: 'Auth failed'
													});
												}
											})
									
									.catch(err => {
										console.log("500 err ", err);
										res.status(500).json({
											message: "Failed to save token",
											error: err
										});
									});
							} else {
								return res.status(200).json({
									message: 'INVALID_PASSWORD'
								});
							}
						})
					} else {
						res.status(200).json({ message: "INVALID_PASSWORD" });
					}
				} else if ((user.profile.status).toLowerCase() == "blocked") {
					res.status(200).json({ message: "USER_BLOCK" });
				} else if ((user.profile.status).toLowerCase() == "unverified") {
					res.status(200).json({ message: "USER_UNVERIFIED" });
				}
			} else {
				res.status(200).json({ message: "NOT_REGISTER" });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};
exports.user_update_password_withoutotp_ID = (req, res, next) => {
	User.findOne({ _id: req.params.ID })
		.exec()
		.then(user => {
			if (user) {
				bcrypt.hash(req.body.pwd, 10, (err, hash) => {
					User.updateOne(
						{ _id: req.params.ID },
						{
							$set: {
								services: {
									password: {
										bcrypt: hash
									},
								},
							}
						}
					)
						.exec()
						.then(data => {
							if (data.nModified == 1) {
								res.status(200).json("PASSWORD_RESET");
							} else {
								res.status(401).json("PASSWORD_NOT_RESET");
							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			} else {
				res.status(404).json("User Not Found");
			}
		})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};
exports.user_update_password_withoutotp_username = (req, res, next) => {
	User.findOne({ username: req.params.username })
		.exec()
		.then(user => {
			console.log("user ", user);
			if (user) {
				bcrypt.hash(req.body.pwd, 10, (err, hash) => {
					User.updateOne(
						{ username: req.params.username },
						{
							$set: {
								services: {
									password: {
										bcrypt: hash
									},
								},
							}
						}
					)
						.exec()
						.then(data => {
							if (data.nModified == 1) {
								res.status(200).json("PASSWORD_RESET");
							} else {
								res.status(401).json("PASSWORD_NOT_RESET");
							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			} else {
				res.status(404).json("User Not Found");
			}
		})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};
exports.user_update_password_with_emailOTP_ID = (req, res, next) => {
	User.findOne({
		"_id": req.params.ID,
		"profile.otpEmail": req.body.emailOTP
	})
		.exec()
		.then(user => {
			if (user) {
				bcrypt.hash(req.body.pwd, 10, (err, hash) => {
					User.updateOne(
						{ _id: req.params.ID },
						{
							$set: {
								services: {
									password: {
										bcrypt: hash
									},
								},
							}
						}
					)
						.exec()
						.then(data => {
							if (data.nModified == 1) {
								res.status(200).json("PASSWORD_RESET");
							} else {
								res.status(401).json("PASSWORD_NOT_RESET");
							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			} else {
				res.status(404).json({ message: "User Not Found or Otp Didnt match" });
			}
		})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};
exports.user_update_password_with_emailOTP_username = (req, res, next) => {
	User.findOne({
		"username": req.params.username,
		"profile.otpEmail": req.body.emailOTP
	})
		.exec()
		.then(user => {
			if (user) {
				bcrypt.hash(req.body.pwd, 10, (err, hash) => {
					User.updateOne(
						{ "username": req.params.username },
						{
							$set: {
								services: {
									password: {
										bcrypt: hash
									},
								},
							}
						}
					)
						.exec()
						.then(data => {
							if (data.nModified == 1) {
								res.status(200).json("PASSWORD_RESET");
							} else {
								res.status(401).json("PASSWORD_NOT_RESET");
							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			} else {
				res.status(404).json({ message: "User Not Found or Otp Didnt match" });
			}
		})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};
exports.set_send_emailotp_usingID = (req, res, next) => {
	var otpEmail = getRandomInt(1000, 9999);
	User.updateOne(
		{ _id: req.params.ID },
		{
			$set: {
				"profile.otpEmail": otpEmail,
			},
		}
	)
		.exec()
		.then(data => {
			if (data.nModified === 1) {
				User.findOne({ _id: req.params.ID })
					.then(user => {
						if (user) {
							request({
								"method": "POST",
								"url": "http://localhost:" + globalVariable.port + "/send-email",
								"body": {
									email: user.profile.email,
									subject: req.body.emailSubject,
									text: req.body.emailContent + " " + otpEmail,
								},
								"json": true,
								"headers": {
									"User-Agent": "Test Agent"
								}
							})
								.then(source => {
									res.status(201).json({ message: "OTP_UPDATED" })
								})
								.catch(err => {
									console.log(err);
									res.status(500).json({
										message: "Failed to Send the send email",
										error: err
									});
								});
						} else {
							res.status(200).json({ message: "User not found" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to find User",
							error: err
						});
					});
			} else {
				console.log("data not modified");
				res.status(401).json({ message: "USER_NOT_UPDATED" })
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to update User",
				error: err
			});
		});
};
exports.set_send_emailotp_usingEmail = (req, res, next) => {
	var optEmail = getRandomInt(1000, 9999);
	console.log("optEmail", optEmail, req.body);
	User.updateOne(
		{ "profile.email": req.params.emailId },
		{
			$set: {
				"profile.otpEmail": optEmail,
			},
		}
	)
		.exec()
		.then(data => {
			if (data.nModified === 1) {
				User.findOne({ "profile.email": req.params.emailId })
					.then(user => {
						if (user) {
							request({
								"method": "POST",
								"url": "http://localhost:" + globalVariable.port + "/send-email",
								"body": {
									email: user.profile.email,
									subject: req.body.emailSubject,
									text: req.body.emailContent + " " + optEmail,
								},
								"json": true,
								"headers": {
									"User-Agent": "Test Agent"
								}
							})
								.then(source => {
									res.status(201).json({ message: "OTP_UPDATED", userID: user._id })
								})
								.catch(err => {
									res.status(500).json({
										message: "Failed to Send the send email",
										error: err
									});
								});
						} else {
							res.status(200).json({ message: "User not found" });
						}
					})
					.catch(err => {
						res.status(500).json({
							message: "Failed to find User",
							error: err
						});
					});
			} else {
				res.status(401).json({ message: "USER_NOT_UPDATED" })
			}
		})
		.catch(err => {
			res.status(500).json({
				message: "Failed to update User",
				error: err
			});
		});
};

// ============ Account dashboard users API methods ============
exports.user_details = (req, res, next) => {
	var id = req.params.userID;
	console.log("inside api:",id);
	User.findOne({ _id: id })
		// .select("profile")
		.exec()
		.then(users => {
			res.status(200).json(users);
			// res.status(200).json({
	  //           message : users
	  //       });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};
// Handle delete contact
exports.delete_user = function (req, res, next) {
	User.findOne({ _id: req.params.userID })
		.exec()
		.then(user => {
			//console.log(user.roles);
			if (user) {
				if (user.roles.indexOf("ba") !== -1) {					
					BusinessAssociate.deleteOne({userID:req.params.userID})
					    .exec()
					    .then(data=>{
					        // res.status(200).json({
					        //     "message": "Business Associate Deleted Successfully."
					        // });
					    })
					    .catch(err =>{
					        console.log(err);
					        // res.status(500).json({
					        //     error: err
					        // });
					    });
				}
				User.deleteOne({ _id: req.params.userID }, function (err) {
					if (err) {
						return res.json({
							error: err
						});
					}
					res.json({
						status: "success",
						message: 'User is deleted!'
					});
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

exports.update_user = (req, res, next) => {
	console.log("inside user-update id:",req.params.userID);
	// console.log("firstname:",req.body.firstName);
	User.updateOne(
		{ _id: req.params.userID },
		{
			$set: {
				"profile.firstname": req.body.firstName,
				"profile.lastname" : req.body.lastName,
				"profile.fullName" : req.body.firstName + ' ' + req.body.lastName,
				"profile.email"    : req.body.emailId,
				"profile.mobile"   : req.body.mobileNumber,
			}
		}
	)
		.exec()
		.then(data => {

			if (data.nModified == 1) {

				res.status(200).json("User Updated");
			} else {
				res.status(401).json("User Not Found");
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

exports.update_user_details = (req, res, next) => {
	var field = req.body.field;
	console.log("inside update user");
	User.findOne({ _id: req.params.userID })
		.exec()
		.then(user => {
			if(user){
				console.log(user);
				if (user.profile.email === req.body.emailId) {
					res.status(200).json({ message: "User already exist." });
				}else{

				}
				var pwd = user.services.password.bcrypt;
				switch (field) {
					case 'all':
						if (pwd) {
							bcrypt.compare(req.body.oldPassword, pwd, (err, result) => {
								if (result) {
									bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
										if (err) {
											return res.status(500).json({
												error: err
											});
										} else {
											User.updateOne(
												{ _id: req.params.userID },
												{
													$set: {
														"services": {
															"password": {
																"bcrypt": hash
															},
														},
														"profile.firstname": req.body.firstName,
														"profile.lastname": req.body.lastName,
														"profile.fullName": req.body.firstName + ' ' + req.body.lastName,
														"profile.email": req.body.emailId,
														"profile.mobile": req.body.mobileNumber,
													}
												}
											)
												.exec()
												.then(data => {
													// if (data.nModified == 1) {
														res.status(200).json({ message: "User details updated successfully." });
													// } else {
													// 	res.status(401).json({ message: "User Not Found" });
													// }
												})
												.catch(err => {
													console.log(err);
													res.status(500).json({
														error: err
													});
												});
										}
									})
								} else {
									res.status(200).json({ message: "Incorrect Password" });
								}

							})
						} else {
							res.status(401).json({ message: "Current password isn't valid." });
						}
						break;
					case 'email':
						if (pwd) {
							bcrypt.compare(req.body.oldPassword, pwd, (err, result) => {
								if (result) {
									bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
										if (err) {
											return res.status(500).json({
												error: err
											});
										} else {
											User.updateOne(
												{ _id: req.params.userID },
												{
													$set: {
														"profile.firstname": req.body.firstName,
														"profile.lastname": req.body.lastName,
														"profile.fullName": req.body.firstName + ' ' + req.body.lastName,
														"profile.email": req.body.emailId,
														"profile.mobile": req.body.mobileNumber,
													}
												}
											)
												.exec()
												.then(data => {
													// if (data.nModified == 1) {
														res.status(200).json({ message: "User details updated successfully." });
													// } else {
													// 	res.status(401).json({ message: "User Not Found" });
													// }
												})
												.catch(err => {
													console.log(err);
													res.status(500).json({
														error: err
													});
												});
										}
									})
								} else {
									res.status(401).json({
										message: "Current password isn't valid."
									});
								}

							})
						} else {
							res.status(401).json({ message: "Current password isn't valid." });
						}
						break;
					case 'password':
						if (pwd) {
							bcrypt.compare(req.body.oldPassword, pwd, (err, result) => {
								if (result) {
									bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
										if (err) {
											return res.status(500).json({
												error: err
											});
										} else {
											User.updateOne(
												{ _id: req.params.userID },
												{
													$set: {
														"services": {
															"password": {
																"bcrypt": hash
															},
														},
														"profile.firstname": req.body.firstName,
														"profile.lastname": req.body.lastName,
														"profile.mobile": req.body.mobileNumber,
														"profile.fullName": req.body.firstName + ' ' + req.body.lastName,
													}
												}
											)
												.exec()
												.then(data => {
													// if (data.nModified == 1) {
														res.status(200).json({ message: "User details updated successfully." });
													// } else {
													// 	res.status(401).json({ message: "User Not Found" });
													// }
												})
												.catch(err => {
													console.log(err);
													res.status(500).json({
														error: err
													});
												});
										}
									})
								} else {
									res.status(401).json({
										message: "Current password isn't valid."
									});
								}

							})
						} else {
							res.status(401).json({ message: "Current password isn't valid." });
						}
						break;
					case 'name':
						User.updateOne(
							{ _id: req.params.userID },
							{
								$set: {
									"profile.firstname": req.body.firstName,
									"profile.lastname": req.body.lastName,
									"profile.mobile": req.body.mobileNumber,
									"profile.fullName": req.body.firstName + ' ' + req.body.lastName,
								}
							}
						)
							.exec()
							.then(data => {
								// if (data.nModified == 1) {
									res.status(200).json({ message: "User details updated successfully." });
								// } else {
								// 	res.status(401).json({ message: "User Not Found" });
								// }
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error: err
								});
							});
						break;
				}

			} else {
				res.status(401).json({ message: "User Not found, Please contact admin." });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

exports.add_user_address = (req, res, next) => {
	// var roleData = req.body.role;
	console.log("inside update user address",req.body);
	User.updateOne(
		{ "_id": req.body.user_ID, "deliveryAddress[0]._id": req.body.deliveryAddressID },
		{
			// $set: { 
			// 	"deliveryAddress.$.name": req.body.name,
			// 	"deliveryAddress.$.email": req.body.email,
			// 	"deliveryAddress.$.addressLine1": req.body.addressLine1,
			// 	"deliveryAddress.$.addressLine2": req.body.addressLine2,
			// 	"deliveryAddress.$.pincode": req.body.pincode,
			// 	"deliveryAddress.$.block": req.body.block,
			// 	"deliveryAddress.$.district" : req.body.district,
			// 	"deliveryAddress.$.country": req.body.country,
			// 	"deliveryAddress.$.countryCode": req.body.countryCode,
			// 	"deliveryAddress.$.city": req.body.city,
			// 	"deliveryAddress.$.state": req.body.state,
			// 	"deliveryAddress.$.stateCode": req.body.stateCode,
			// 	"deliveryAddress.$.mobileNumber": req.body.mobileNumber,
			// 	"deliveryAddress.$.addType": req.body.addType,
			// }
			$push: {
				"deliveryAddress": [{
					"name": req.body.name,
					"email": req.body.email,
					"addressLine1": req.body.addressLine1,
					"addressLine2": req.body.addressLine2,
					"pincode": req.body.pincode,
					"block": req.body.block,
					"district" : req.body.district,
					"city": req.body.city,
					"stateCode": req.body.stateCode,
					"state": req.body.state,
					"countryCode": req.body.countryCode,
					"country": req.body.country,
					"mobileNumber": req.body.mobileNumber,
					"addType": req.body.addType
				}]
			}
		}
	)
		.exec()
		.then(data => {
			res.status(200).json({
				"message": "Address updated successfully."
				// "message" : data
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};
exports.add_delivery_address = (req, res, next) => {
	console.log("inside add delivery req body:",req.body);
	User.updateOne(
		{ '_id': req.body.user_ID },
		{
			$push: {
				"deliveryAddress": [{
					"name": req.body.name,
					"email": req.body.email,
					"addressLine1": req.body.addressLine1,
					"addressLine2": req.body.addressLine2,
					"pincode": req.body.pincode,
					"block": req.body.block,
					"district" : req.body.district,
					"city": req.body.city,
					"stateCode": req.body.stateCode,
					"state": req.body.state,
					"countryCode": req.body.countryCode,
					"country": req.body.country,
					"mobileNumber": req.body.mobileNumber,
					"addType": ""
				}]
			}
		})
		.exec()
		.then(data => {
			if (data.nModified == 1) {
				res.status(200).json({
					"message": "Address added successfully."
				});
			} else {
				console.log("data:" ,data);
				res.status(401).json({
					"message": "User Not Found"
				});
			}
		})
		.catch(error => {
			console.log("error:",error);
			res.status(500).json({
				error: error
			});
		})
};

exports.delete_delivery_address = (req, res, next) => {
	User.updateOne(
		{ '_id': req.body.user_ID },
		{
			$pull: { "deliveryAddress": { "_id": req.body.deliveryAddressID } }
		}
	)
		.exec()
		.then(data => {
			if (data.nModified == 1) {
				res.status(200).json({
					"message": "Address deleted successfully."
				});
			} else {
				res.status(401).json({
					"message": "User Not Found"
				});
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json({
				error: error
			});
		})
};
//===================insert BA  ==================
exports.ba_signupadmin = (req, res, next) => {
	console.log("Inside add ba");
	User.find()
		.exec()
		.then(user => {
			bcrypt.hash(req.body.pwd, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({
						error: err
					});
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						createdAt: new Date,
						services: {
							password: {
								bcrypt: hash
							},
						},
						mobileNumber: req.body.mobileNumber,
						emails: [
							{
								address: req.body.emailId,
								verified: true
							}
						],
						profile: {
							firstName: req.body.companyName,
							lastName: req.body.companyName,
							fullName: req.body.companyName,
							emailId: req.body.emailId,
							mobileNumber: req.body.mobileNumber,
							status: req.body.status,
							// center_ID	  : req.body.center_ID,
							// centerName	  : req.body.centerName,
						},
						username: req.body.emailId,
						roles: (req.body.roles),

					});
					user.save()
						.then(newUser => {
							if (newUser) {
								res.status(200).json({
									message: "BA added successfully",
									user: newUser
								});

							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				}
			});

		})
};
//================ vendor signup ========================
exports.vendor_signup = (req, res, next) => {
	console.log("inside vendor signup:", req.body);
	var mailSubject, mailText, smsText, NotificationData;
	Masternotifications.findOne({ "templateType": "Email", "templateName": "Vendor New Registration" })
		.exec()
		.then((notificationData) => {
			console.log("Notification response");
			NotificationData = notificationData;
			// mailSubject = maildata.subject;
			// mailText = maildata.content
			
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});

	Masternotifications.findOne({ "templateType": "SMS", "templateName": "Vendor New Registration" })
		.exec()
		.then((smsdata) => {
			var textcontent = smsdata.content;
			var regex = new RegExp(/(<([^>]+)>)/ig);
			var textcontent = smsdata.content.replace(regex, '');
			textcontent = textcontent.replace(/\&nbsp;/g, '');
			smsText = textcontent
		})
		.catch();
	User.find()
		.exec()
		.then(user => {
			bcrypt.hash(req.body.pwd, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({
						error: err
					});
				} else {
					
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						createdAt: new Date,
						services: {
							password: {
								bcrypt: hash
							},
						},
						mobileNumber: req.body.mobileNumber,
						emails: [
							{
								address: req.body.emailId,
								verified: true
							}
						],
						profile: {
							firstname: req.body.firstName,
							lastname : req.body.lastName,
							fullName : req.body.firstName + ' ' + req.body.lastName,
							email    : req.body.emailId,
							mobile   : req.body.mobileNumber,
							status   : req.body.status,
						},
						role: (req.body.roles),
						username: req.body.emailId,

					});
					user.save()
						.then(newUser => {
							if (newUser) {
								var variables = {
									"username"        : newUser.profile.email,
									"password"        : req.body.pwd,
								}
								if(NotificationData){
									var content = NotificationData.content;
									if(content.indexOf('[') > -1 ){
										var wordsplit = content.split('[');
									}
					
									var tokens = [];
									var n = 0;
									for(i=0;i<wordsplit.length;i++){
										if(wordsplit[i].indexOf(']') > -1 ){
											tokensArr = wordsplit[i].split(']');
											tokens[n] = tokensArr[0];
											n++;
										}
									}
									var numOfVar = Object.keys(variables).length;
					
									for(i=0; i<numOfVar; i++){
										var tokVar = tokens[i].substr(1,tokens[i].length-2);
										content = content.replace(tokens[i],variables[tokens[i]]);
									}
									content = content.split("[").join("'");
									content = content.split("]").join("'");
									// console.log("content = ",content);
									var tData={
										content:content,
										subject:NotificationData.subject
									}
									mailSubject = NotificationData.subject;
									mailText = content 
								}//NotificationData

								request({
									"method": "POST",
									"url": "http://localhost:" + gloabalVariable.PORT + "/send-email",
									"body": {
										"email": newUser.profile.email,
										"subject": mailSubject,
										"text": "Submitted",
										"mail": 'Hello ' + newUser.profile.fullName + ',' + '\n' + "\n <br><br>" + mailText + "<b> </b>" + '\n' + '\n' + ' </b><br><br>\nRegards,<br>Team AnasHandicraft',
									},
									"json": true,
									"headers": {
										"User-Agent": "Test App"
									}
								})
								.then((sentemail) => {
									res.header("Access-Control-Allow-Origin", "*");

									res.status(200).json({
										"message": 'NEW-USER-CREATED',
										"user_id": newUser._id,
									});
								})
								.catch((err) => {
									res.status(500).json({
										error: err
									});
								});

								// const client = new plivo.Client('', '');
								// const sourceMobile = "+919923393733";
								// var text = "Dear User, " + '\n' + "" + smsText + " : ";

								// client.messages.create(
								// 	src = sourceMobile,
								// 	dst = '+91' + req.body.mobileNumber,
								// 	text = text
								// ).then((result) => {
								// 	// return res.status(200).json("OTP "+OTP+" Sent Successfully ");
								// 	return res.status(200).json({
								// 		"message": 'NEW-USER-CREATED',
								// 		"user_id": newUser._id,
								// 	});
								// })
								// .catch(otpError => {
								// 	console.log('otp', otpError);
								// 	return res.status(501).json({
								// 		message: "Some Error Occurred in OTP Send Function",
								// 		error: otpError
								// 	});
								// });
								// res.status(200).json({
								// 	"message": 'NEW-USER-CREATED',
								// 	"user_id": newUser._id,
								// });
							}
							res.status(200).json({
								"message": 'NEW-USER-CREATED',
								"user_id": newUser._id,
							});
						})
						.catch(err => {
							console.log("error while creating vendor:",err);
							res.status(500).json({
								error: err
							});
						});
				}
			});

		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};