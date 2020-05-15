const mongoose	        = require("mongoose");
const ProjectSettings   = require('./ModelProjectSettings.js');

exports.create_projectSettings = (req, res, next) => {
    var conditionQuery      = "";
    var listRequiredFields  = ""; 
    switch(req.body.type){
        case 'S3'       :
            conditionQuery      = req.body.key && req.body.secret && req.body.bucket && req.body.region;
            listRequiredFields  = "Keys, secret, bucket and region";
            break;
        case 'SMS'      :
            conditionQuery      = req.body.key && req.body.secret;
            listRequiredFields  = "Keys and secret";
            break;  
        case 'GOOGLE'   :
            conditionQuery      = req.body.key;
            listRequiredFields  = "Keys";
            break;
        default         :
            res.status(200).json("type can be either S3 or SMS or GOOGLE");
            break;
    }
    if(conditionQuery){
    	ProjectSettings.findOne({type:req.body.type})
    		.exec()
    		.then(data =>{
    			if(data){
    				return res.status(200).json({
    					message : 'Details already exists.',
                        details : data
    				});
    			}else{
                const projectsetting = new ProjectSettings({
                    _id             : mongoose.Types.ObjectId(),      
                    key             : req.body.key,
                    secret          : req.body.secret,
                    bucket          : req.body.bucket,
                    region          : req.body.region,
                    type            : req.body.type
                });
                
                projectsetting.save(
                    (err)=>{
                        if(err){
                            console.log(err);
                            return  res.status(500).json({
                                error: err
                            });          
                        }
                        res.status(200).json({ 
                            message: 'Details Inserted!',
                            data: projectsetting
                        });
                    }
                );
            }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }else{
        res.status(200).json({message : "REQUIRED_FIELDS : "+listRequiredFields});
    }
};
exports.fetch_projectsettings = (req, res, next)=>{
    ProjectSettings.findOne({"type": req.params.type})
        .exec()
        .then(data=>{
            if(data){
                res.status(200).json(data);
            }else{
                res.status(200).json({
                    message : "DATA_NOT_FOUND",
                })
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });            
};
exports.fetch_projectsettings_all = (req, res, next)=>{
    ProjectSettings.find({})
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
exports.patch_projectsettings = (req, res, next)=>{
    var conditionQuery      = "";
    var listRequiredFields  = ""; 
    switch(req.body.type){
        case 'S3'       :
            conditionQuery      = req.body.key && req.body.secret && req.body.bucket && req.body.region;
            listRequiredFields  = "Keys, secret, bucket and region";
            break;
        case 'SMS'      :
            conditionQuery      = req.body.key && req.body.secret;
            listRequiredFields  = "Keys and secret";
            break;  
        case 'GOOGLE'   :
            conditionQuery      = req.body.key;
            listRequiredFields  = "Keys";
            break;
        default         :
            res.status(200).json("type can be either S3 or SMS or GOOGLE");
            break;
    }
    if(conditionQuery){
        ProjectSettings.updateOne(
                                    {"type": req.params.type},
                                    {
                                        $set : {
                                                "key"         : req.body.key,
                                                "secret"      : req.body.secret,
                                                "bucket"      : req.body.bucket,
                                                "region"      : req.body.region,                    
                                        }
                                    }
                                )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    res.status(200).json({
                        message : "DETAILS_UPDATED",
                    });
                }else{
                    res.status(200).json({
                        message : "DETAILS_NOT_UPDATED",
                    })
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });   
    }else{
        res.status(200).json({message : "REQUIRED_FIELDS : "+listRequiredFields});
    } 
};
exports.delete_projectsettings = (req, res, next)=>{
    ProjectSettings.deleteOne({"type": req.params.type})
        .exec()
        .then(data=>{
            if(data.deletedCount === 1){
                res.status(200).json({
                    message : "DETAILS_DELETED",
                });
            }else{
                res.status(200).json({
                    message : "DATA_NOT_FOUND",
                })
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });            
};



