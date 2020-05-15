const mongoose	= require("mongoose");
const Masternotifications = require('./ModelMasterNotification.js');
const User 				    = require('../userManagement/ModelUsers.js');
var nodeMailer              = require('nodemailer');
exports.create_masternotification = (req,res,next)=>{
    console.log(req.body)
	Masternotifications.findOne({templateType:req.body.templateType,templateName:req.body.templateName})
		.exec()
		.then(data =>{
			if(data){
				return res.status(200).json({
					message: 'Notification Details already exists'
				});
			}else{
				const masternotifications = new Masternotifications({
                    _id             : new mongoose.Types.ObjectId(),
                    templateType    : req.body.templateType,	
                    templateName    : req.body.templateName,
                    subject         : req.body.subject,
                    content         : req.body.content,	
                    createdAt       : new Date(),
                    createdBy       : req.body.createdBy,
                });
                masternotifications.save()
                    .then(data=>{
                        res.status(200).json({message: "Notification Details Added",ID:data._id});
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
			}
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};
exports.list_masternotification = (req,res,next)=>{
    Masternotifications.find()
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.detail_masternotification = (req,res,next)=>{
    Masternotifications.findOne({_id:req.params.notificationmaster_ID})
        .exec()
        .then(data=>{
            if(data){
                res.status(200).json(data);
            }else{
                res.status(404).json('Master Notification not found');
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.update_masternotification = (req,res,next)=>{
    Masternotifications.updateOne(
                                    { _id:req.params.ID},  
                                    {
                                        $set:{
                                            templateType    : req.body.templateType,    
                                            templateName    : req.body.templateName,
                                            subject         : req.body.subject,
                                            content         : req.body.content
                                        }
                                    }
                                )
                                .exec()
                                .then(data=>{
                                    console.log('data ',data);
                                    if(data.nModified == 1){
                                        res.status(200).json({ message:"Master notifications Updated"});
                                    }else{
                                        res.status(401).json({ message:"Master notifications Found"});
                                    }
                                })
                                .catch(err =>{
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
};
exports.delete_masternotification = (req,res,next)=>{
    Masternotifications.deleteOne({_id:req.params.ID})
        .exec()
        .then(data=>{
            console.log('data ',data);
            if(data.deletedCount == 1){
                res.status(200).json("Master notification deleted");
            }else{
                res.status(401).json("Master notification not found");
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.deleteall_masternotification = (req,res,next)=>{
    Masternotifications.deleteMany({})
        .exec()
        .then(data=>{
            console.log('data ',data);
            if(data.deletedCount > 0){
                res.status(200).json("All Master notification deleted");
            }else{
                res.status(401).json("Master notification not found");
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.send_notifications = (req, res, next) => {
    console.log("IN send_notifications");
    const senderEmail = 'iassureitmail@gmail.com';
    const senderEmailPwd = 'iAssureIT@123';
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: senderEmail,
            pass: senderEmailPwd
        }
    });
    console.log("IN transporter==>",transporter);
    main();
    async function main() {
        console.log("IN main");
        var toEmail = "";
        var userProfile = {};   
        if (req.body.toUserId === "admin") {
            toEmail = "iassureitmail@gmail.com";
            console.log("IN toEmail==>",toEmail);
        } else {
            console.log("IN else");
            userProfile = await getProfileByUserId(req.body.toUserId);
            if (userProfile && userProfile !== null & userProfile !== "") {
                toEmail = userProfile.profile.email;
                // toMobile = userProfile.mobileNumber ;
                // var MobileNumber  = [];
                // if(userProfile.alternatemobile1 != null && userProfile.alternatemobile1 != "") MobileNumber.push(userProfile.alternatemobile1);
                // if(userProfile.alternatemobile2 != null && userProfile.alternatemobile2 != "") MobileNumber.push(userProfile.alternatemobile2);
                // if(userProfile.alternatemobile3 != null && userProfile.alternatemobile3 != "") MobileNumber.push(userProfile.alternatemobile3);
                // MobileNumber.push(userProfile.mobileNumber);
                // const templateDetailsSMS = await getTemplateDetailsSMS(req.body.templateName, req.body.variables);
                // const client = new plivo.Client(globalVariable.plivo_auth,globalVariable.plivo_secret);   // Vowels LLP
                // const sourceMobile = globalVariable.sourceMobile;
                // var text = templateDetailsSMS.content.replace(/<[^>]+>/g, '');
                // var k = 0;
                // console.log("IN sourceMobile",sourceMobile);
                // console.log("IN sourceMobile",MobileNumber.length);

                // for(k = 0 ; k < MobileNumber.length; k++){
                // console.log("IN MobileNumber",MobileNumber[k],k);
                //     client.messages.create(
                //         src = sourceMobile,
                //         dst = MobileNumber[k],
                //         text = text
                //     ).then((result) => {
                //         console.log("k ",k);
                //     })
                //     .catch(error => {
                //         console.log("k ",k);
                //         console.log("error ",error)
                //         res.status(501).json({
                //             message: "Some Error Occurred in SMS Send Function",
                //             error : error
                //         });
                //     });
                // }
            }
        }

        // //==============  SEND INAPP ================
        // const templateDetailsInApp = await getTemplateDetailsInApp(req.body.templateName,req.body.variables); 
        // const InAppNotification = new Notifications({
        //     _id             : mongoose.Types.ObjectId(),
        //     user_id         : req.body.toUserId,
        //     status          : 'Unread',
        //     notifMessage    : templateDetailsInApp.content,
        //     createdAt       : new Date()
        // });
        // InAppNotification.save( 
            
        //     function (err) {
        //         if (err) {
        //             console.log(err);
        //             return res.status(500).json({
        //                 error: err
        //             });
        //         }
        //         res.header("Access-Control-Allow-Origin","*");
        //         res.status(200).json({
                    
        //             message: 'New In App Notification created!',
        //             data: InAppNotification
        //         });
        //     }
        // )
        // //==============  SEND EMAIL ================
        console.log("IN SEND EMAIL");
        const templateDetailsEmail = await getTemplateDetailsEmail(req.body.templateName, req.body.variables);
        console.log("senderEmail ",senderEmail);
        var mailOptions = {
            from: '"Coffic Admin" <' + senderEmail + '>', // sender address
            to: toEmail, // list of receiver
            subject: templateDetailsEmail.subject, // Subject line
            html: "<pre>" + templateDetailsEmail.content + "</pre>", // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("IN error masternotification",error);

                res.status(500).json({
                    message: "Send Email Failed",
                });
            }
            if (info) {
                console.log("IN info masternotification",info);

                res.header("Access-Control-Allow-Origin","*");
                res.status(200).json({
                    
                    message: "Mail Sent Successfully",
                });
            }
            res.render('index');
        });
    }
}

function getProfileByUserId(toUserId) {
    return new Promise(function (resolve, reject) {
        User
            .findOne({ "_id": toUserId })
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

    });
}
function getTemplateDetailsEmail(templateName, variables) {
    console.log("IN SEND EMAILntemplateName==>",templateName);
    console.log("IN SEND variables==>",variables);
    return new Promise(function (resolve, reject) {
        Masternotifications
            .findOne({ "templateName": templateName, "templateType": 'Email' })
            .exec()
            .then(NotificationData => {
                if (NotificationData) {
                    var content = NotificationData.content;
                    var wordsplit = [];
                    if (content.indexOf('[') > -1) {
                        wordsplit = content.split('[');
                    }
                    var tokens = [];
                    var n = 0;
                    for (i = 0; i < wordsplit.length; i++) {
                        if (wordsplit[i].indexOf(']') > -1) {
                            tokensArr = wordsplit[i].split(']');
                            tokens[n] = tokensArr[0];
                            n++;
                        }
                    }
                    var numOfVar = Object.keys(variables).length;
                    for (i = 0; i < numOfVar; i++) {
                        content = content.replace(tokens[i], variables[tokens[i]]);
                    }
                    if(i >= numOfVar){
                        content = content.split("[").join(" ");
                        content = content.split("]").join(" ");
                        var tData = {
                            content: content,
                            subject: NotificationData.subject
                        }
                        resolve({
                            content: content,
                            subject: NotificationData.subject
                        });
                    }
                }else{
                    resolve(true);
                }
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}
function getTemplateDetailsSMS(templateName, variables) {
    return new Promise(function (resolve, reject) {
        Masternotifications
            .findOne({ "templateName": templateName, "templateType": 'SMS' })
            .exec()
            .then(NotificationData => {
                if (NotificationData) {
                    var content = NotificationData.content;
                    var wordsplit = [];
                    if (content.indexOf('[') > -1) {
                        wordsplit = content.split('[');
                    }
                    var tokens = [];
                    var n = 0;
                    for (i = 0; i < wordsplit.length; i++) {
                        if (wordsplit[i].indexOf(']') > -1) {
                            tokensArr = wordsplit[i].split(']');
                            tokens[n] = tokensArr[0];
                            n++;
                        }
                    }
                    var numOfVar = Object.keys(variables).length;
                    for (i = 0; i < numOfVar; i++) {
                        content = content.replace(tokens[i], variables[tokens[i]]);
                    }
                    content = content.split("[").join(" ");
                    content = content.split("]").join(" ");
                    var tData = {
                        content: content,
                        subject: NotificationData.subject
                    }
                    resolve(tData);
                }//NotificationData
            })
            .catch(err => {
                console.log(err);
                err.status(500).json({
                    error: err
                });
            });
    });
}

function getTemplateDetailsInApp(templateName, variables) {
    console.log("templateName = ", templateName);
    return new Promise(function (resolve, reject) {
        var selector = { "templateName": templateName, "templateType": 'InApp' };
        console.log("selector = ",selector);
        Masternotifications
            .findOne(selector)
            .exec()
            .then(NotificationData => {
                if (NotificationData) {
                    var content = NotificationData.content;
                    var wordsplit = [];
                    if (content.indexOf('[') > -1) {
                        wordsplit = content.split('[');
                    }
                    var tokens = [];
                    var n = 0;
                    for (i = 0; i < wordsplit.length; i++) {
                        if (wordsplit[i].indexOf(']') > -1) {
                            tokensArr = wordsplit[i].split(']');
                            tokens[n] = tokensArr[0];
                            n++;
                        }
                    }
                    var numOfVar = Object.keys(variables).length;
                    for (i = 0; i < numOfVar; i++) {
                        content = content.replace(tokens[i], variables[tokens[i]]);
                    }
                    content = content.split("[").join(" ");
                    content = content.split("]").join(" ");
                    var tData = {    
                        content: content,
                    }
                    resolve(tData);
                }//NotificationData
            })
            .catch(err => {
                console.log(err);
                err.status(500).json({
                    error: err
                });
            });
    });
}
