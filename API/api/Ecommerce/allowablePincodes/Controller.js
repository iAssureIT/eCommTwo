const mongoose	        = require("mongoose");
const Allowablepincode   = require('./Model');

exports.add_allowablePincodes = (req, res, next) => {
    console.log("=========req.body==========:",req.body);
    var allowablePincodeObj = req.body;
    for (let franchiseID in allowablePincodeObj) { 
        if (allowablePincodeObj.hasOwnProperty(franchiseID)) { 
            value = allowablePincodeObj[franchiseID]; 
            console.log("---Mydata:",franchiseID, value); 
            Allowablepincode.find({"franchiseID":franchiseID})
            .exec()
            .then(data =>{
                // console.log(req.body)
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



                    // res.status(200).json({
                    //     "message": "Franchise already exists."
                    // });
                }else{
                    const allowablePincode = new Allowablepincode({
                        _id              : new mongoose.Types.ObjectId(),                    
                        franchiseID     : franchiseID,
                        companyID       : allowablePincodeObj[franchiseID].companyID,
                        alloablePincodes : allowablePincodeObj[franchiseID].pincodes,
                        createdAt        : new Date()
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


