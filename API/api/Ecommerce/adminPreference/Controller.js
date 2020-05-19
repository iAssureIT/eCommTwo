const mongoose	        = require("mongoose");
const Adminpreference   = require('../adminPreference/Model');

exports.add_websiteModel = (req, res, next) => {
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
                            website : {
                                "websiteModel" : req.body.websiteModel
                            }
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
                _id      : mongoose.Types.ObjectId(),      
                website : {
                    "websiteModel" : req.body.websiteModel
                } 
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
                            message: 'WebSite model added successfully.',
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


exports.add_websiteModel1 = (req,res,next)=>{   
    console.log("inside webmodel api",req.body.websiteModel);
    Preference.findOne()
		.exec()
		.then(data =>{
        if(data){
            console.log("id:",data);

        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    Preference.updateOne(
        { _id:req.body.preferenceID},  
        {
            $set:{
                website : {
                    "websiteModel" : req.body.websiteModel
                }
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
           
};
