const mongoose	        = require("mongoose");
const Contract          = require('./ModelContract.js');
var   ObjectID          = require('mongodb').ObjectID;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var FileReader = require('filereader')

exports.insertContract = (req,res,next)=>{
    const contract = new Contract({
                    _id                         : new mongoose.Types.ObjectId(),
                    contractDate                : req.body.contractDate,
                    effectiveUpto               : req.body.effectiveUpto, 
                    companyId                   : req.body.companyId,
                    companyLocationId           : req.body.companyLocationId,
                    entityType                  : req.body.entityType,
                    entityId                    : req.body.entityId,
                    entityLocationId            : req.body.entityLocationId,
                    contractDuration            : req.body.contractDuration,
                    //packages                    : req.body.packages,
                    createdBy                   : req.body.createdBy,
                    createdAt                   : new Date()
                })
                contract.save()
                .then(data=>{
                    res.status(200).json({ created : true, contractID : data._id });
                })
                .catch(err =>{
                    res.status(500).json({ error: err }); 
                });
};
exports.savePackage = (req,res,next)=>{
    var packages = req.body.packages;
    Contract.updateOne(
        { "_id":ObjectID(req.body.contractID)},  
        {
            $set:   { 'packages' : packages}
        }
    )
    .exec()
    .then(data=>{
        res.status(200).json({ updated : true });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};
exports.saveCondition = (req,res,next)=>{
    Contract.updateOne(
        { "_id": ObjectID(req.body.contractID)},  
        {
            $set:   { 'conditions' : req.body.conditions}
        }
    )
    .exec()
    .then(data=>{
        res.status(200).json({ updated : true });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};
exports.updatePackage = (req,res,next)=>{
    var packages = req.body.packages[0];
    Contract.updateOne(
        { "_id":ObjectID(req.body.contractID), "packages._id": ObjectID(req.body.packageID)},  
        {
            $set:   { 
                'packages.$.packageId'      : packages.packageId,
                'packages.$.packageName'    : packages.packageName,
                'packages.$.MaxHrs'         : packages.MaxHrs,
                'packages.$.MaxKm'          : packages.MaxKm,
                'packages.$.nightChargesFromTime'        : packages.nightChargesFromTime,
                'packages.$.nightChargesToTime'          : packages.nightChargesToTime,
                'packages.$.earlyMorningChargesFromTime' : packages.earlyMorningChargesFromTime,
                'packages.$.earlyMorningChargesToTime'   : packages.earlyMorningChargesToTime,
                'packages.$.fixCharges'     : packages.fixCharges,
                'packages.$.extras'         : packages.extras
            }
        }
    )
    .exec()
    .then(data=>{
        res.status(200).json({ updated : true });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};
exports.countContracts = (req, res, next)=>{
    Contract.aggregate([
        {
           $lookup: {
              from: "entitymasters",
              localField: "vendorId",    
              foreignField: "_id",  
              as: "vendor"
           }
        },
        {
           $lookup: {
              from: "entitymasters",
              localField: "corporateId",   
              foreignField: "_id",  
              as: "corporate"
           }
        },
        { $group : { _id : "$_id", count : {$sum: 1  } } }
     ])
        .exec()
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchContracts = (req, res, next)=>{
    Contract.find({})
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
exports.getContracts = (req, res, next)=>{
    Contract.aggregate([
        {
           $lookup: {
              from: "companysettings",
              localField: "companyId",    
              foreignField: "_id",  
              as: "company"
           }
        },
        {
           $unwind:"$company"
        },
        {
           $lookup: {
              from: "entitymasters",
              localField: "entityId",   
              foreignField: "_id",  
              as: "entity"
           }
        },
        {
           $unwind:"$entity"
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
exports.joincontract = (req, res, next)=>{
    console.log('contractID', req.params.contractID);
    Contract.aggregate([
        { "$match" : {"_id": ObjectID(req.params.contractID)}},
        {
            $lookup: {
               from: "companysettings",
               localField: "companyId",    
               foreignField: "_id",  
               as: "company"
            }
         },
         {
            $unwind:"$company"
         },
         {
            $lookup: {
               from: "entitymasters",
               localField: "entityId",   
               foreignField: "_id",  
               as: "entity"
            }
         },
         {
            $unwind:"$entity"
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
exports.joincontractlist = (req, res, next)=>{
    Contract.aggregate([
        {
            $lookup: {
               from: "companysettings",
               localField: "companyId",    
               foreignField: "_id",  
               as: "company"
            }
         },
         {
            $unwind:"$company"
         },
         {
            $lookup: {
               from: "entitymasters",
               localField: "entityId",   
               foreignField: "_id",  
               as: "entity"
            }
         },
         {
            $unwind:"$entity"
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
exports.fetchSingleContract = (req, res, next)=>{
    Contract.findOne({ _id: req.params.contractID })
        .exec()
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.updateContract = (req,res,next)=>{
    var extras = req.body.contactDetails;
    
    Contract.updateOne(
            { "_id":req.body.contractID},  
            {
                $set:   { 
                    'contractDate'                : req.body.contractDate,
                    'effectiveUpto'               : req.body.effectiveUpto, 
                    'companyId'                   : req.body.companyId,
                    'companyLocationId'           : req.body.companyLocationId,
                    'entityType'                  : req.body.entityType,
                    'entityId'                    : req.body.entityId,
                    'entityLocationId'            : req.body.entityLocationId,
                    'contractDuration'            : req.body.contractDuration,
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                Contract.updateOne(
                { _id:req.body.contractID},
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
exports.deleteContract = (req, res, next)=>{
    Contract.deleteOne({_id: req.params.contractID})
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
exports.deletePackageInContract = (req,res,next)=>{   
    Contract.updateOne(
            { _id:req.params.contractID},  
            {
                $pull: { 'packages' : {_id:req.params.packageID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(401).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};


exports.filterContract = (req, res, next)=>{

    var selector = {};
    selector['$or']=[];
    //console.log(req.body)
    for (var key in req.body) {

        if (key=='corporateIds' && req.body.corporateIds.length > 0 ) {
            var corporateIds = [];
            // covert array of ids into object ids
            for(var subkey in req.body.corporateIds){
                corporateIds.push(ObjectID(req.body.corporateIds[subkey])) 
            }
            selector.corporateId =  { $in: corporateIds } 
        }
        if (key=='vendorIds' && req.body.vendorIds.length > 0 ) {
            var vendorIds = [];
            // covert array of ids into object ids
            for(var subkey in req.body.vendorIds){
                vendorIds.push(ObjectID(req.body.vendorIds[subkey])) 
            }
            selector.vendorId =  { $in: vendorIds } 
        }
        if (key=='stateCodes' && req.body.stateCodes.length > 0 ) {
            
            selector['$or'].push({ "corporate.locations.stateCode" :  { $in: req.body.stateCodes } });
            selector['$or'].push({ "vendor.locations.stateCode" :  { $in: req.body.stateCodes } });
        }
        
    }
    console.log(selector)
    Contract.aggregate([
        {
           $lookup: {
              from: "entitymasters",
              localField: "vendorId",    
              foreignField: "_id",  
              as: "vendor"
           }
        },
        {
           $unwind:"$vendor"
        },
        {
           $lookup: {
              from: "entitymasters",
              localField: "corporateId",   
              foreignField: "_id",  
              as: "corporate"
           }
        },
        {
           $unwind:"$corporate"
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

exports.searchContract = (req, res, next)=>{
    var selector = {}; 
    selector['$or']=[];
    selector["$or"].push({ "corporate.companyName"    : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "vendor.companyName"       : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "corporate.groupName"    : { $regex : req.params.str, $options: "i"}  })
    selector["$or"].push({ "vendor.groupName"    : { $regex : req.params.str, $options: "i"} })
    
    console.log(selector)
    Contract.aggregate([
        {
           $lookup: {
              from: "entitymasters",
              localField: "vendorId",    
              foreignField: "_id",  
              as: "vendor"
           }
        },
        {
           $unwind:"$vendor"
        },
        {
           $lookup: {
              from: "entitymasters",
              localField: "corporateId",   
              foreignField: "_id",  
              as: "corporate"
           }
        },
        {
           $unwind:"$corporate"
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

exports.packagesInContract = (req, res, next)=>{
  Contract.aggregate([{ "$match": {"corporateId": ObjectID(req.params.corporateID)}},
                      { "$unwind":"$packages" }
                    ])
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.image = (req, res, next)=>{
    var url = 'https://fivebees.s3.amazonaws.com/propertiesImages/download.png';
    function toDataURL(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onload = function() {
           var fileReader = new FileReader();
              fileReader.onloadend = ()=> {
                 callback(fileReader.result);
              }
              fileReader.readAsDataURL(httpRequest.response);
        };
        httpRequest.open('GET', url);
        httpRequest.responseType = 'blob';
        httpRequest.send();
     }
     toDataURL(url, function(dataUrl) {
     console.log('Result in string:', dataUrl)
     res.status(200).json('hgjhghjg'); 
  })
        

};