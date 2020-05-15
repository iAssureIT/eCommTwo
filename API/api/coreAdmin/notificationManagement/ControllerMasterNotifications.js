const mongoose	= require("mongoose");
const Masternotifications = require('./ModelMasterNotification.js');
const Notifications         = require('./ModelNotification.js');
const User 				    = require('../userManagement/ModelUsers.js');
const PersonMaster          = require('../personMaster/ModelPersonMaster.js');
const EventMapping          = require('../EventMappingMaster/ModelEventMapping.js');
const nodeMailer            = require('nodemailer');
const globalVariable        = require('../../nodemon.js');



exports.create_masternotification = (req,res,next)=>{
	Masternotifications.findOne({templateType:req.body.templateType,event:req.body.event,role:req.body.role,status:req.body.status,company:req.body.company})
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
                    event           : req.body.event,    
                    role            : req.body.role,
                    company         : req.body.company,
                    subject         : req.body.subject,
                    content         : req.body.content,	
                    status          : req.body.status, 
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
    Masternotifications.find({})
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

exports.list_mode_masternotification = (req,res,next)=>{
    console.log('req.body: ',req.body)
    Masternotifications.find({"templateType":req.body.mode,"event":req.body.event})
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
        res.status(200).json(data);
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
                                            status          : req.body.status,
                                            subject         : req.body.subject,
                                            content         : req.body.content
                                        }
                                    }
                                )
                                .exec()
                                .then(data=>{
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
    Masternotifications.find({event: req.body.event,status:'active'})
    .sort({createdAt:1})
    .exec()
    .then(data=>{
        main();
        async function main(){
            var returnData = [];
            if(data && data.length > 0){
                for(k = 0 ; k < data.length ; k++){
                    returnData.push({
                        role: data[k].role,
                        mode : data[k].templateType,
                        event : data[k].event,
                        company : data[k].company
                    })
                }//k
            }//if
            console.log('!!!!!!!!!!!!!!!!')
            console.log('returnData: ',returnData)
            if(returnData && returnData.length > 0){
                for(var i=0 ; i< returnData.length ; i++){
                    var role = returnData[i].role;
                    var templateName = returnData[i].event;
                    var mode = returnData[i].mode;
                    var company = returnData[i].company;
                    console.log('========================================================')
                    console.log('role,templateName,mode=>',role,templateName,mode)


                    switch(role){
                        case 'admin':
                                    var userData = await getAdminUserId();
                                    break;
                        case 'manager':
                                    var userData = await getManagerData(req.body.toUserId)
                                    break;
                        case 'employee':
                                    var userData = await getProfileByUserId(req.body.toUserId);
                                    break;
                        case 'corporateadmin':
                                    var userData = await getCorporateAdminData(req.body.toUserId);
                                    break;
                    }

                    console.log('********************')
                    console.log(company +'==='+ req.body.company)
                    console.log('********************')
                     // //==============  SEND EMAIL ================
                    if(mode === 'Email'){
                        console.log('1')
                        var toEmail = userData.email;
                        if(company === req.body.company){
                            const emailDetails = await getTemplateDetailsEmail(company,templateName,role,req.body.variables);
                            const sendMail = await sendEmail(toEmail,emailDetails.subject,emailDetails.content)
                        }else{
                            const emailDetails = await getTemplateDetailsEmail(null,templateName,role,req.body.variables);
                            const sendMail = await sendEmail(toEmail,emailDetails.subject,emailDetails.content)
                        }
                        
                    } // mode == 'Email'

                      // //==============  SEND INAPP ================
                    if(mode === 'Notification'){
                        console.log('2')
                        var toUserId = userData.id;
                        if(company === req.body.company){
                            const notificationDetails = await getTemplateDetailsInApp(company,templateName,role,req.body.variables); 
                            const sendNotification = await sendInAppNotification(toUserId,userData.email,req.body.event,notificationDetails)
                        }else{
                            const notificationDetails = await getTemplateDetailsInApp(null,templateName,role,req.body.variables); 
                            const sendNotification = await sendInAppNotification(toUserId,userData.email,req.body.event,notificationDetails)
                        }
                        
                    }//mode == 'Notification'

                       // //==============  SEND SMS ================
                    if(mode === 'SMS'){
                        console.log('3')
                        var toMobile = userData.mobile;
                        if(company === req.body.company){
                            const SMSDetails = await getTemplateDetailsSMS(company,templateName,role,req.body.variables);
                            var text = SMSDetails.content.replace(/<[^>]+>/g, '');
                        const SMS = await sendSMS(toMobile,text); 
                        }else{
                            const SMSDetails = await getTemplateDetailsSMS(null,templateName,role,req.body.variables);
                            var text = SMSDetails.content.replace(/<[^>]+>/g, '');
                            const SMS = await sendSMS(toMobile,text); 
                        }
                        
                    }// mode == 'SMS'

                }//i
            }//returnData
        }
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });

        
}

function getProfileByUserId(toUserId) {
    return new Promise(function (resolve, reject) {
        User
            .findOne({ "_id": toUserId })
            .exec()
            .then(data => {
                resolve({email:data.profile.email,
                        id: data._id,
                        mobile: data.profile.mobile
                });
            })
            .catch(err => {
                console.log(err);
                reject({
                    error: err
                });
            });

    });
}

function getManagerData(toUserId) {
    return new Promise(function (resolve, reject) {
        PersonMaster.findOne({'userId':toUserId})
        .exec()
        .then(data=>{
            if(data.approvingAuthorityId1){
                PersonMaster.findOne({'employeeId':data.approvingAuthorityId1})
                .exec()
                .then(res=>{
                    User
                    .findOne({ "_id": res.userId })
                    .exec()
                    .then(data => {
                        resolve({email:data.profile.email,
                                id: data._id,
                                mobile: data.profile.mobile
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        reject({
                            error: err
                        });
                    });
                })
                .catch(err=>{
                    console.log('error: ',err)
                })
            }
            
        })
        .catch(error=>{
            reject({error:error})
        })
        

    });
}

function getCorporateAdminData(toUserId){
    return new Promise(function (resolve, reject) {
        User
            .findOne({ "_id": toUserId })
            .exec()
            .then(data => {
                if(data.profile && data.profile.companyID){
                    User
                    .findOne({ "profile.companyID": data.profile.companyID, "roles":"corporateadmin"})
                    .exec()
                    .then(data => {
                        resolve({email:data.profile.email,
                                id: data._id,
                                mobile: data.profile.mobile
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        reject({
                            error: err
                        });
                    });
                }
            })
            .catch(err => {
                console.log(err);
                reject({
                    error: err
                });
            });

    });
}

function getAdminUserId() {
    return new Promise(function (resolve, reject) {
        User
            .findOne({"roles":"admin"})
            .exec()
            .then(data => {
                resolve({email:data.profile.email,
                        id: data._id,
                        mobile: data.profile.mobile
                });
            })
            .catch(err => {
                console.log(err);
                reject({
                    error: err
                });
            });

    });
}

function sendSMS(MobileNumber,text){
    return new Promise(function (resolve, reject) {
        const client = new plivo.Client(globalVariable.plivo_auth,globalVariable.plivo_secret);   // Vowels LLP
        const sourceMobile = globalVariable.sourceMobile;
        
        client.messages.create(
            src = sourceMobile,
            dst = MobileNumber,
            text = text
        ).then((result) => {
            resolve(result)
        })
        .catch(error => {
            console.log("error ",error)
            reject(error);
        });
    })
}

function sendInAppNotification(toUserId,email,event,notificationDetails){
    return new Promise(function (resolve, reject) {
        const InAppNotification = new Notifications({
            _id             : new mongoose.Types.ObjectId(),
            masternotificationId : notificationDetails.id,
            toMailId        : email,
            event           : event,
            toUserId         : toUserId,
            status          : 'Unread',
            notifBody       : notificationDetails.content,
            createdAt       : new Date()
        });
        InAppNotification.save()
        .then(data=>{
            resolve(data);
        })
        .catch(err =>{
            reject(err);
        });
    })
}

function sendEmail(toEmail,subject,content){
    console.log('====**INSIDE EMAIL**=====',toEmail,subject,content)

    async function main() {
      const senderEmail = globalVariable.user;
      const senderEmailPwd = globalVariable.pass;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodeMailer.createTransport({
        host: globalVariable.emailHost,
        port: globalVariable.emailPort,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: senderEmail, 
          pass: senderEmailPwd 
        }
      });

      console.log('email details====> ',senderEmail,toEmail,subject,content)

      // send mail with defined transport object
      var mailOptions = {
            from: globalVariable.AppName+'" Admin" <' + senderEmail + '>', // sender address
            to: toEmail, // list of receiver
            subject: subject, // Subject line
            html: "<pre>" + content + "</pre>", // html body
        };
       let info = await transporter.sendMail(mailOptions, (error, info) => {
            console.log("Message sent: %s", error,info);
        });
     
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
// console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(err=>{console.log('mail error=>',err)});
   
}

function getTemplateDetailsEmail(company,templateName,role,variables) {
    console.log(company,templateName, variables)
    return new Promise(function (resolve, reject) {
        Masternotifications
            .findOne({ "event": templateName, "templateType": 'Email', "company":company, "role":role })
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
function getTemplateDetailsSMS(company, templateName,role,variables) {
    return new Promise(function (resolve, reject) {
        Masternotifications
            .findOne({ "event": templateName, "templateType": 'SMS', "company": company, "role":role })
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

function getTemplateDetailsInApp(company, templateName,role,variables) {
    console.log('in app: ',company,templateName, variables)
    return new Promise(function (resolve, reject) {
        var selector = { "event": templateName, "templateType": 'Notification', "company": company, "role":role };
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
                        id:NotificationData._id,  
                        content: content,
                    }
                    resolve(tData);
                }//NotificationData
            })
            .catch(err => {
                console.log(err);
                reject({
                    error: err
                });
            });
    });
}


