const mongoose	        = require("mongoose");
const Adminpreference   = require('../adminPreference/Model');

exports.insert_preferences = (req, res, next) => {
    console.log("res:",res);
	Adminpreference.findOne()
		.exec()
		.then(data =>{
			if(data){
                console.log("data:",data);
                Adminpreference.updateOne(
                    { _id:data._id},  
                    {
                        $set:{
                            "websiteModel"      : req.body.websiteModel
                            "askPincodeToUser"  : req.body.askPincodeToUser
                        }
                    }
                )
                .exec()
                .then(data=>{
                    res.status(200).json({
                        "message": "WebSite model updated successfully."
                    });
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
			}else{
                console.log("inside else");
            const adminpreference = new Adminpreference({
                _id                 : mongoose.Types.ObjectId(),      
                "websiteModel"      : req.body.websiteModel,
                "askPincodeToUser"  : req.body.askPincodeToUser
            });            
            adminpreference.save(
                function(err){
                    if(err){
                        console.log("error:",err);
                        return  res.status(500).json({
                            error: err
                        });          
                    }else{
                        res.status(200).json({ 
                            message: 'Preferences Saved Successfully.',
                            data: adminpreference
                        });
                    }
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
};



