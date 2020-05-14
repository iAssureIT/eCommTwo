const mongoose	             = require("mongoose");
const VehicleMaster          = require('./ModelVehicleMaster.js');
const VehicleDriverMapping   = require('../vehicleDriverMapping/ModelVehicleDriverMapping.js');


exports.insertVehicle = (req,res,next)=>{
    VehicleMaster.findOne({  "vehicleNumber" :  req.body.vehicleNumber })
        .exec()
        .then(data=>{
            if (data) {
                res.status(200).json({ duplicated : true });
            }else{

            const vehicleMaster = new VehicleMaster({
                            _id                       : new mongoose.Types.ObjectId(),
                            vehicleImage              : req.body.vehicleImage,
                            categoryId                : req.body.categoryId,
                            category                  : req.body.category,  
                            brandId                   : req.body.brandId,
                            brand                     : req.body.brand,
                            modelId                   : req.body.modelId, 
                            model                     : req.body.model, 
                            capacity                  : req.body.capacity,  
                            fuelTypeId                : req.body.fuelTypeId, 
                            fuelType                  : req.body.fuelType,
                            vehicleDriveType          : req.body.vehicleDriveType,  
                            ownership                 : req.body.ownership,  
                            vehicleNumber             : req.body.vehicleNumber,
                            registrationDate          : req.body.registrationDate,   
                            RCDoc                     : req.body.RCDoc,
                            insuranceDate             : req.body.insuranceDate,  
                            insuranceDoc              : req.body.insuranceDoc,
                            permitType                : req.body.permitType,
                            permitValidUpto           : req.body.permitValidUpto,  
                            permitDoc                 : req.body.permitDoc,
                            authorizationUpto         : req.body.authorizationUpto,
                            authorizationDoc          : req.body.authorizationDoc,
                            PUCValidUpto              : req.body.PUCValidUpto,
                            PUCDoc                    : req.body.PUCDoc,
                            createdBy                 : req.body.createdBy,
                            createdAt                 : new Date()
                        })
                        vehicleMaster.save()
                        .then(data=>{
                            res.status(200).json({ created : true, vehicleId : data._id });
                        })
                        .catch(err =>{
                            console.log('error 6465', err);
                            res.status(500).json({ error: err }); 
                        });  
            }
        })
        .catch(err =>{ res.status(500).json({ error: err }); });  

};

exports.countVehicles = (req, res, next)=>{
    VehicleMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchVehicles = (req, res, next)=>{
    VehicleMaster.find({})
        .sort({createdAt : -1})
        // .skip(req.body.startRange)
        // .limit(req.body.limitRange)
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.filterVehicles = (req,res,next)=>{
    var selector = {};
    console.log(req.body)
    for (var key in req.body) {
        if (key=='categoryIds' && req.body.categoryIds.length > 0 ) {
            selector.categoryId =  { $in: req.body.categoryIds } 
        }
        if (key=='brandIds' && req.body.brandIds.length > 0) {
            selector.brandId =  { $in: req.body.brandIds } 
        }
        if (key=='modelIds' && req.body.modelIds.length > 0) {
            selector.modelId =  { $in: req.body.modelIds } 
        }
        if (key=='fueltypeIds' && req.body.fueltypeIds.length > 0) {
            selector.fuelTypeId =  { $in: req.body.fueltypeIds } 
        }
        if (req.body.initial && req.body.initial != 'All') {
            selector.brand = { $regex : "^"+req.body.initial,$options: "i"}
        }
    }
    
    VehicleMaster.find(selector)
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
exports.fetchSingleVehicle = (req, res, next)=>{
    VehicleMaster.findOne({ _id: req.params.vehicleID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.searchVehicle = (req, res, next)=>{
    var selector = {}; 
    selector['$or']=[];
    selector["$or"].push({ vehicle      : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ category     : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ brand        : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ model        : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ fuelType     : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ vehicleNumber: { $regex : req.params.str, $options: "i"}  })

    VehicleMaster.find(selector)
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateVehicle = (req, res, next)=>{
    VehicleMaster.updateOne(
            { _id:req.body.vehicleID },  
            {
                $set:   {   'vehicleImage'              : req.body.vehicleImage,
                            'categoryId'                : req.body.categoryId,
                            'category'                  : req.body.category,
                            'brandId'                   : req.body.brandId,
                            'brand'                     : req.body.brand,
                            'modelId'                   : req.body.modelId, 
                            'model'                     : req.body.model, 
                            'capacity'                  : req.body.capacity,  
                            'fuelTypeId'                : req.body.fuelTypeId, 
                            'fuelType'                  : req.body.fuelType,
                            'vehicleDriveType'          : req.body.vehicleDriveType,  
                            'ownership'                 : req.body.ownership,  
                            'vehicleNumber'             : req.body.vehicleNumber,
                            'registrationDate'          : req.body.registrationDate,   
                            'RCDoc'                     : req.body.RCDoc,
                            'insuranceDate'             : req.body.insuranceDate,  
                            'insuranceDoc'              : req.body.insuranceDoc,
                            'permitType'                : req.body.permitType,
                            'permitValidUpto'           : req.body.permitValidUpto,  
                            'permitDoc'                 : req.body.permitDoc,
                            'authorizationUpto'         : req.body.authorizationUpto,
                            'authorizationDoc'          : req.body.authorizationDoc,
                            'PUCValidUpto'              : req.body.PUCValidUpto,
                            'PUCDoc'                    : req.body.PUCDoc
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                VehicleMaster.updateOne(
                { _id:req.body.vehicleID},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : req.body.updatedBy 
                                            }] 
                            }
                })
                .exec()
                .then(data=>{
                    res.status(200).json({ updated : true });
                })
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({ error: err });
        });
};
exports.deleteVehicle = (req, res, next)=>{
    VehicleMaster.deleteOne({_id: req.params.vehicleID})
        .exec()
        .then(data=>{
            if(data.deletedCount === 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(200).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });            
};



/************PB*******************/

function getVehicleMappingData(){
    return new Promise((resolve,reject)=>{
        VehicleDriverMapping.find({})
                .exec()
                .then((data)=>{
                    console.log("data- vehicle",data);
                    if (data) {
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                })
                .catch((err)=>{
                    reject(err);
                })

    });
}

exports.getInactiveVehicles = (req,res,next)=>{
    console.log("req.body====",req.body);
        VehicleMaster.find({})
        .exec()
        .then(data=>{
            console.log("data ",data);
            if (data) {
                var getInactiveVehicles = data.find((value, index)=>{
                    return String(value._id) === req.body.vehicleID
                })
                // console.log("getActivity ",getActivity)
               
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};