const mongoose	        = require("mongoose");
const VehicleDriverMapping          = require('./ModelVehicleDriverMapping.js');
var   ObjectId          = require('mongodb').ObjectId;


exports.insertVehicleDriverMapping = (req,res,next)=>{
    const entities = new VehicleDriverMapping({
                    _id                         : new mongoose.Types.ObjectId(),
                    vehicleID                   : req.body.vehicleID,
                    driverID                    : req.body.driverID,
                    mapDate                     : new Date(),
                    status                      : req.body.status,
                    createdBy                   : req.body.createdBy,
                    createdAt                   : new Date(),
                })
                entities.save()
                .then(data=>{
                    res.status(200).json({ created : true, mappingID : data._id });
                })
                .catch(err =>{
                    res.status(500).json({ error: err }); 
                });
};
exports.countVehicleDriverMappings = (req, res, next)=>{
    VehicleDriverMapping.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchVehicleDriverMappings = (req, res, next)=>{
    VehicleDriverMapping.find({})
        .sort({createdAt : -1})
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.getVehicleDriverMappings = (req, res, next)=>{
    VehicleDriverMapping.aggregate([
        {
           $lookup: {
              from: "vehiclemasters",
              localField: "vehicleID",    
              foreignField: "_id",  
              as: "vehicle"
           }
        },
        {
            $unwind:"$vehicle"
         },
        {
           $lookup: {
              from: "personmasters",
              localField: "driverID",   
              foreignField: "_id",  
              as: "driver"
           }
        },
        {
           $unwind:"$driver"
        },
     ])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.joinVehicleDriver = (req, res, next)=>{
    VehicleDriverMapping.aggregate([
        { "$match" : {_id: ObjectId(req.params.mappingID)}},
        {
            $lookup: {
               from: "vehiclemasters",
               localField: "vehicleID",    
               foreignField: "_id",  
               as: "vehicle"
            }
         },
         {
             $unwind:"$vehicle"
          },
         {
            $lookup: {
               from: "personmasters",
               localField: "driverID",   
               foreignField: "_id",  
               as: "driver"
            }
         },
         {
            $unwind:"$driver"
         },
     ])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.joinVehicleDriverList = (req, res, next)=>{
    VehicleDriverMapping.aggregate([
        {
            $lookup: {
               from: "vehiclemasters",
               localField: "vehicleID",    
               foreignField: "_id",  
               as: "vehicle"
            }
         },
         {
             $unwind:"$vehicle"
          },
         {
            $lookup: {
               from: "personmasters",
               localField: "driverID",   
               foreignField: "_id",  
               as: "driver"
            }
         },
         {
            $unwind:"$driver"
         },
     ])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSingleVehicleDriverMapping = (req, res, next)=>{
    VehicleDriverMapping.findOne({ _id: req.params.mappingID })
        .exec()
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.updateVehicleDriverMapping = (req,res,next)=>{    
    VehicleDriverMapping.updateOne(
            { "_id":req.body.mappingID},  
            {
                $set:   { 
                    'unmapDate'                 :  new Date(),
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                VehicleDriverMapping.updateOne(
                { _id:req.body.mappingID},
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
            res.status(500).json({ error: err });
        });
};
exports.updateVehicleDriverMappingStatus = (req,res,next)=>{    
    VehicleDriverMapping.updateOne(
            { "_id":req.body.mappingID},  
            {
                $set:   { 
                    'status'                 :  req.body.status,
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                VehicleDriverMapping.updateOne(
                { _id:req.body.mappingID},
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
            res.status(500).json({ error: err });
        });
};

exports.deleteVehicleDriverMapping = (req, res, next)=>{
    VehicleDriverMapping.deleteOne({_id: req.params.mappingID})
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


exports.filterVehicleDriverMapping = (req, res, next)=>{

    var selector = {};
    
    console.log(req.body)
    for (var key in req.body) {

        if (key=='driverIds' && req.body.driverIds.length > 0 ) {
            var driverIds = [];
            // covert array of ids into object ids
            for(var subkey in req.body.driverIds){
                driverIds.push(ObjectId(req.body.driverIds[subkey])) 
            }
            selector.driverID =  { $in: driverIds } 
        }
        if (key=='vehicleIds' && req.body.vehicleIds.length > 0 ) {
            var vehicleIds = [];
            // covert array of ids into object ids
            for(var subkey in req.body.vehicleIds){
                vehicleIds.push(ObjectId(req.body.vehicleIds[subkey])) 
            }
            // selector.vehicle={};
            selector.vehicleID =  { $in: vehicleIds } 
        }
        if (key=='stateCodes' && req.body.stateCodes.length > 0 ) {
            selector['$or']=[];
            selector['$or'].push({ "driver.address.stateCode" :  { $in: req.body.stateCodes } });
        }
        if (key=='districts' && req.body.districts.length > 0 ) {
            selector['$or']=[];
            selector['$or'].push({ "driver.address.district" :  { $in: req.body.districts } });
        }
        console.log('selector',selector);
    }
    console.log(selector)
    VehicleDriverMapping.aggregate([
        {
            $lookup: {
               from: "vehiclemasters",
               localField: "vehicleID",    
               foreignField: "_id",  
               as: "vehicle"
            }
         },
         {
             $unwind:"$vehicle"
          },
         {
            $lookup: {
               from: "personmasters",
               localField: "driverID",   
               foreignField: "_id",  
               as: "driver"
            }
         },
         {
            $unwind:"$driver"
         },
        {
            $match : selector
        }
     ])
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.searchVehicleDriverMapping = (req, res, next)=>{
    var selector = {}; 
    selector['$or']=[];
    selector["$or"].push({ "driver.firstName"    : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "driver.lastName"    : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "vehicle.vehicleNumber"       : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "vehicle.category"    : { $regex : req.params.str, $options: "i"} })
    selector["$or"].push({ "vehicle.brand"    : { $regex : req.params.str, $options: "i"} })
    selector["$or"].push({ "vehicle.model"    : { $regex : req.params.str, $options: "i"} })
    
    console.log(selector)
    VehicleDriverMapping.aggregate([
        {
            $lookup: {
               from: "vehiclemasters",
               localField: "vehicleID",    
               foreignField: "_id",  
               as: "vehicle"
            }
         },
         {
             $unwind:"$vehicle"
          },
         {
            $lookup: {
               from: "personmasters",
               localField: "driverID",   
               foreignField: "_id",  
               as: "driver"
            }
         },
         {
            $unwind:"$driver"
         },
        {
            $match : selector
        }
     ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
