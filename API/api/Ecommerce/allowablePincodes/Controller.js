const mongoose	        = require("mongoose");
const Allowablepincode   = require('./Model');

exports.add_allowablePincodes = (req, res, next) => {
    // console.log("=========req.body==========:",req.body);
    var allowablePincodeObj = req.body;
    for (let franchiseID in allowablePincodeObj) { 
        if (allowablePincodeObj.hasOwnProperty(franchiseID)) { 
            value = allowablePincodeObj[franchiseID]; 
            // console.log("value----",value); 
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
                            "message": "Allowable Pincodes Updated Successfully."
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
                    // console.log("---data to send:",allowablePincode); 
                    allowablePincode.save()
                    .then(data=>{
                        res.status(200).json({
                            "message": "Allowable Pincodes Submitted Successfully."
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
    // console.log("Pincode:======",pincode);
    Allowablepincode.find()
    .exec()
    .then(data=>{
        // console.log("Data============",data);  
        var delivery = ""; 
        if(data){
            for(var franchiseObj of data){
                if(franchiseObj.allowablePincodes.includes(pincode)){
                    delivery = "available";      
                    break;
                }                
            }
            console.log("Delivery status=========",delivery);
            if(delivery === "available"){
                res.status(200).json({ message: "Delivery Available" });
            }else{
                res.status(200).json({ message: "Delivery Not Available" });
            }
        }     
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

