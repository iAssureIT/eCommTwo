const mongoose	        = require("mongoose");
const Allowablepincode   = require('./Model');

exports.add_allowablePincodes = (req, res, next) => {
    console.log("=========req.body==========:",req.body);
    var allowablePincodeObj = req.body;
    for (let franchiseID in allowablePincodeObj) { 
        if (allowablePincodeObj.hasOwnProperty(franchiseID)) { 
            value = allowablePincodeObj[franchiseID]; 
            console.log("value----",value); 
            Allowablepincode.find({"franchiseID":franchiseID})
            .exec()
            .then(data =>{                
                if(data && data.length > 0){    
                    Allowablepincode.find({"franchiseID":franchiseID})
                    .updateOne(
                        { franchiseID:franchiseID},  
                        {
                            $set:{
                                alloablePincodes : allowablePincodeObj[franchiseID].pincodes,
                            }
                        }
                    )
                    .exec()
                    .then(data=>{
                        res.status(200).json({
                            "message": "Pincodes updated successfully."
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });

                }else{
                    const allowablePincode = new Allowablepincode({
                        _id               : new mongoose.Types.ObjectId(),                    
                        franchiseID       : franchiseID,
                        companyID         : allowablePincodeObj[franchiseID].companyID,
                        allowablePincodes : allowablePincodeObj[franchiseID].pincodes,
                        createdAt         : new Date()
                    });
                    console.log("---data to send:",allowablePincode); 
                    allowablePincode.save()
                    .then(data=>{
                        res.status(200).json({
                            "message": "Allowable pincodes Submitted Successfully."
                        });
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
        } 
    }
};
exports.get_allowablePincodes = (req, res, next)=>{
    Allowablepincode.find()
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
}

exports.check_delivery = (req, res, next)=>{
    var pincode = req.params.pincode;
    console.log("Pincode:======",pincode);
    Allowablepincode.find()
    .exec()
    .then(data=>{
        console.log("Data============",data);   
        if(data){
            console.log("data.lin=====",data.length);
            for(var i=0;i<data.length;i++){
                for(var k=0;k<data[i].allowablePincodes.length;k++){
                    console.log("Inside k loop",data[i].allowablePincodes[k]);
                    if(data[i].allowablePincodes[k] === pincode){
                        var delivery = "available";
                        console.log("========Delivery available===========");
                        break;
                    }
                }
            }
        }     
        res.status(200).json(data
            // message : "Delivery available",
        );
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

