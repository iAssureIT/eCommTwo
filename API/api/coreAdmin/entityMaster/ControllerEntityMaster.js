const mongoose  = require("mongoose");

const EntityMaster = require('./ModelEntityMaster');
var request = require('request-promise');
const gloabalVariable = require('../../../nodemon.js');
var   ObjectID          = require('mongodb').ObjectID;

exports.insertEntity = (req,res,next)=>{
    insertEntityFun();
    async function insertEntityFun(){
        var getnext = await getNextSequence()

        EntityMaster.findOne({  
                            companyName               : req.body.companyName,
                            groupName                 : req.body.groupName,
                            companyEmail              : req.body.companyEmail, 
                            companyPhone              : req.body.companyPhone,
                            website                   : req.body.website   
                            })
        .exec()
        .then(data=>{
            if (data) {
                res.status(200).json({ duplicated : true });
            }else{
                const entity = new EntityMaster({
                    _id                       : new mongoose.Types.ObjectId(),
                    supplierOf                : req.body.supplierOf,
                    entityType                : req.body.entityType,
                    profileStatus             : req.body.profileStatus,
                    companyID                 : getnext ? getnext : 1, 
                    companyName               : req.body.companyName,
                    groupName                 : req.body.groupName,
                    CIN                       : req.body.CIN,   
                    COI                       : req.body.COI,
                    TAN                       : req.body.TAN,
                    companyLogo               : req.body.companyLogo,
                    website                   : req.body.website,
                    companyPhone              : req.body.companyPhone,
                    companyEmail              : req.body.companyEmail,
                    userID                    : req.body.userID,  
                    createdBy                 : req.body.createdBy,
                    createdAt                 : new Date()
                })
                entity.save()
                .then(data=>{
                    res.status(200).json({ created : true, entityID : data._id ,companyID : data.companyID});
                })
                .catch(err =>{
                    res.status(500).json({ error: err }); 
                });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err }); 
        });
        
    }
    
};

function getNextSequence() {
    return new Promise((resolve,reject)=>{
    EntityMaster.findOne().sort({companyID:-1})       
        .exec()
        .then(data=>{
            if (data) { 
                var seq = data.companyID;
                seq = seq+1;
                resolve(seq) 
            }else{
               resolve(1)
            }
            
        })
        .catch(err =>{
            reject(0)
        });
    });
}

exports.listEntity = (req,res,next)=>{
    // console.log("listEntity req.params = ",req.params);

    EntityMaster.find({entityType:req.params.entityType})
                .sort({createdAt : -1})    
                .then(data=>{
                    // console.log("listEntity data = ",data);
                    res.status(200).json(data);
                })
                .catch(err =>{
                    res.status(500).json({
                        error: err
                    });
                });
};
exports.listEntity_franchise = (req,res,next)=>{
    EntityMaster.find({entityType:req.params.entityType,_id:req.params.franchiseid})
                .sort({createdAt : -1})    
                .then(data=>{
                    // console.log("listEntity data = ",data);
                    res.status(200).json(data);
                })
                .catch(err =>{
                    res.status(500).json({
                        error: err
                    });
                });
};

exports.countEntity = (req,res,next)=>{
    EntityMaster.find({entityType:req.params.entityType}).count()       
        .exec()
        .then(data=>{
            res.status(200).json({count: data});
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.singleEntity = (req,res,next)=>{
    EntityMaster.findOne({_id : req.params.entityID})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.entityDetails = (req,res,next)=>{
    EntityMaster.findOne({"contactPersons.userID" : req.params.userID})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.fetchLocationEntities = (req, res, next)=>{
    EntityMaster.findOne({_id : req.body.entityID})
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

exports.companyDetail = (req, res, next)=>{
   EntityMaster.findOne({companyID : req.body.companyID})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};



exports.companyName = (req,res,next)=>{
    console.log("req.params.companyID===>",req.params.companyID);
    EntityMaster.findOne({companyID : req.params.companyID})
    .exec()
    .then(data=>{
        if(data){
            res.status(200).json(data);
        }else{
            res.status(200).json({message:"COMPANY_NOT_FOUND"})
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.branchCodeLocation = (req,res,next)=>{
    EntityMaster.findOne({_id : req.params.entityID, 'locations.branchCode' : req.params.branchCode})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.updateEntity = (req,res,next)=>{
    EntityMaster.updateOne(
            { _id:req.body.entityID},  
            {
                $set:   { 
                            'companyName'               : req.body.companyName,
                            'groupName'                 : req.body.groupName,
                            'CIN'                       : req.body.CIN,   
                            'COI'                       : req.body.COI,
                            'companyEmail'              : req.body.companyEmail,
                            'TAN'                       : req.body.TAN,
                            'companyLogo'               : req.body.companyLogo,
                            'website'                   : req.body.website,
                            'companyPhone'              : req.body.companyPhone
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                EntityMaster.updateOne(
                { _id:req.body.entityID},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : req.body.updatedBy 
                                            }] 
                            }
                } )
                .exec()
                .then(data=>{
                    res.status(200).json({ updated : true });
                })
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
};

exports.updateProfileStatus = (req,res,next)=>{
    EntityMaster.updateOne(
            { _id:req.body.entityID},  
            {
                $set:   { 
                            'profileStatus':req.body.status
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                EntityMaster.updateOne(
                { _id:req.body.entityID},
                {
                    $push:  { 'updateLog' : [{  updatedAt      : new Date(),
                                                updatedBy      : req.body.updatedBy 
                                            }] 
                            }
                } )
                .exec()
                .then(data=>{
                    res.status(200).json({ updated : true });
                })
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
};

exports.addLocation = (req,res,next)=>{
    var locationdetails = req.body.locationDetails;
    
    insertLocationdetails();
    async function insertLocationdetails() {
        // var data = await updateDocInLoc(req.body.entityID,locationdetails)
        // console.log('data====>',data)
         var getData = await fetchLocData(req.body.entityID,locationdetails);
        if (getData.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            if(locationdetails.GSTIN || locationdetails.PAN){
                var compare = await updateSameStateDocuments(req.body.entityID,locationdetails)
            }
            var getnext = await getNextBranchCode(req.body.entityID)
            locationdetails.branchCode = getnext;
            EntityMaster.updateOne(
                    { _id: ObjectID(req.body.entityID) },  
                    {
                        $push:  { 'locations' : locationdetails }
                    }
                )
                .exec()
                .then(data=>{
                    if(data.nModified == 1){
                        res.status(200).json({ created : true });
                    }else{
                        res.status(401).json({ created : false });
                    }
                })
                .catch(err =>{
                    res.status(500).json({ error: err });
                });
        }
    }
};

function fetchLocData(entityID,locationdetails){
    return new Promise((resolve,reject)=>{
        EntityMaster.find(
        {_id: entityID,"locations.locationType":locationdetails.locationType, "locations.addressLine1": locationdetails.addressLine1},{ 'locations.$': 1 })
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err =>{
            reject(0)
        });
    })
}

function getNextBranchCode(entityID) {
    return new Promise((resolve,reject)=>{
    EntityMaster.findOne({"_id" : entityID }).sort({"locations.branchCode":-1})       
        .exec()
        .then(data=>{
            if (data.locations.length > 0 ) { 
                var seq = data.locations[data.locations.length - 1].branchCode;
                seq = seq+1;
                resolve(seq) 
            }else{
               resolve(1)
            }
            
        })
        .catch(err =>{
            reject(0)
        });
    });
}

function updateSameStateDocuments(entityID,locationdetails){
    return new Promise((resolve,reject)=>{
        EntityMaster.updateMany({"_id":entityID, "locations.state":locationdetails.state},
            {
                $set:   { 
                          'locations.$[].GSTIN'        : locationdetails.GSTIN,
                          'locations.$[].GSTDocument'  : locationdetails.GSTDocument,
                          'locations.$[].PAN'          : locationdetails.PAN,
                          'locations.$[].PANDocument'  : locationdetails.PANDocument
                        }
            },{ multi: true }
        )
        .exec()
        .then(data=>{
            resolve(data)
        })
        .catch(err =>{
            reject(0)
        });
    })
}

exports.updateDocInLoc= (req,res,next)=>{
    EntityMaster.find({"_id":req.body.entityID, "locations.state":req.body.state},{_id: 0, 'locations.$': 1})
    .exec()
    .then(data=>{
         console.log('results====>',JSON.stringify(data[0].locations[0].GSTIN)) 
         // EntityMaster.updateOne({"_id":entityID, "locations._id":})
//              const category = await Category.findOne({ _id:req.params.categoryId });
// const lastIndex: number = category.items.length - 1;

// console.log(category.items[lastIndex]);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}

exports.singleLocation = (req,res,next)=>{
    EntityMaster.find({"_id" : req.body.entityID, "locations._id":req.body.locationID },
        {"locations.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.updateSingleLocation = (req,res,next)=>{
    var locationdetails = req.body.locationDetails;
    insertLocationdetails();
    async function insertLocationdetails() {
    // var getData = await fetchLocData(req.body.entityID,locationdetails);
    //     if (getData.length > 0) {
    //         res.status(200).json({ duplicated : true });
    //     }else{
            if(locationdetails.GSTIN || locationdetails.PAN){
                var compare = await updateSameStateDocuments(req.body.entityID,locationdetails)
            }
    
           EntityMaster.updateOne(
                { "_id":req.body.entityID, "locations._id": req.body.locationID},  
                {
                    $set:   { 'locations.$.locationType' : locationdetails.locationType,
                              'locations.$.branchCode'   : locationdetails.branchCode,
                              'locations.$.addressLine1' : locationdetails.addressLine1,
                              'locations.$.addressLine2' : locationdetails.addressLine2,
                              'locations.$.countryCode'  : locationdetails.countryCode,
                              'locations.$.country'      : locationdetails.country,
                              'locations.$.stateCode'    : locationdetails.stateCode,
                              'locations.$.state'        : locationdetails.state,
                              'locations.$.district'     : locationdetails.district,
                              'locations.$.city'         : locationdetails.city,
                              'locations.$.area'         : locationdetails.area,
                              'locations.$.pincode'      : locationdetails.pincode,
                              'locations.$.latitude'     : locationdetails.latitude,
                              'locations.$.longitude'    : locationdetails.longitude,
                              'locations.$.GSTIN'        : locationdetails.GSTIN,
                              'locations.$.GSTDocument'  : locationdetails.GSTDocument,
                              'locations.$.PAN'          : locationdetails.PAN,
                              'locations.$.PANDocument'  : locationdetails.PANDocument
                            }
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    res.status(200).json({ updated : true });
                }else{
                    res.status(200).json({ updated : false });
                }
            })
            .catch(err =>{
                res.status(500).json({ error: err });
            });
        // }
    }
};

exports.addContact = (req,res,next)=>{
    var contactdetails = req.body.contactDetails;
    EntityMaster.find({"contactPersons.email": contactdetails.email,"contactPersons._id" : {$ne : req.body.entityID}})
    .then((datas)=>{
        if(datas.length > 0){
            res.status(200).json({ duplicated : true });
        }else{
            EntityMaster.updateOne(
                { _id:req.body.entityID},  
                {
                    $push:  { 'contactPersons' : contactdetails }
                }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    res.status(200).json({ created : true });
                }else{
                    res.status(200).json({ created : false });
                }
            })
            .catch(err =>{
                res.status(500).json({
                    error: err
                });
            });
        }
    })
    .catch((err)=>{
        res.status(500).json({
            error: err
        });
    })
    
};
exports.singleContact = (req,res,next)=>{
    EntityMaster.findOne({"_id" : req.body.entityID, "contactPersons._id":req.body.contactID,"contactPersons.employeeID" : {$ne : req.body.employeeID}  },
        {"contactPersons.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.getAllVendors = (req,res,next)=>{
    EntityMaster.find({"entityType":"vendor","locations.city":req.params.city})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.getAdminCompany = (req,res,next)=>{
    EntityMaster.find({"entityType":"appCompany"})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};


exports.updateSingleContact = (req,res,next)=>{
    var contactdetails = req.body.contactDetails;
    console.log('contactdetails', contactdetails, contactdetails.createUser);
    EntityMaster.find({"contactPersons.email": contactdetails.email, _id: { $ne: req.body.entityID}, "contactPersons._id" : {$ne : req.body.contactID},"contactPersons.employeeID" : {$ne : req.body.employeeID} })
    .then((datas)=>{
        if(datas.length > 0){
            res.status(200).json({ duplicated : true });
        }else{
            EntityMaster.updateOne(
            { "_id":req.body.entityID, "contactPersons._id": req.body.contactID},  
            {
                $set:   { 'contactPersons.$.branchCode' : contactdetails.branchCode,
                          'contactPersons.$.branchName' : contactdetails.branchName,
                          'contactPersons.$.profilePhoto': contactdetails.profilePhoto,
                          'contactPersons.$.firstName'  : contactdetails.firstName,
                          'contactPersons.$.middleName' : contactdetails.middleName,
                          'contactPersons.$.lastName'   : contactdetails.lastName,
                          'contactPersons.$.DOB'        : contactdetails.DOB,
                          'contactPersons.$.employeeID' : contactdetails.employeeID,
                          'contactPersons.$.phone'      : contactdetails.phone,
                          'contactPersons.$.altPhone'   : contactdetails.altPhone,
                          'contactPersons.$.whatsappNo' : contactdetails.whatsappNo,
                          'contactPersons.$.email'      : contactdetails.email,
                          'contactPersons.$.gender'     : contactdetails.gender,
                          'contactPersons.$.department' : contactdetails.department,
                          'contactPersons.$.designationName'    : contactdetails.designationName,
                          'contactPersons.$.designation'        : contactdetails.designation,
                          'contactPersons.$.departmentName'     : contactdetails.departmentName,
                          'contactPersons.$.address'            : contactdetails.address,
                          'contactPersons.$.role'               : contactdetails.role,
                          'contactPersons.$.createUser'         : contactdetails.createUser,
                          'contactPersons.$.bookingApprovalRequired'    : contactdetails.bookingApprovalRequired,
                          'contactPersons.$.approvingAuthorityId1'      : contactdetails.approvingAuthorityId1,
                          'contactPersons.$.approvingAuthorityId2'      : contactdetails.approvingAuthorityId2,
                          'contactPersons.$.approvingAuthorityId3'      : contactdetails.approvingAuthorityId3,
                          'contactPersons.$.preApprovedKilometer'       : contactdetails.preApprovedKilometer,
                          'contactPersons.$.preApprovedAmount'  : contactdetails.preApprovedAmount,
                          'contactPersons.$.preApprovedRides'  : contactdetails.preApprovedRides,
                        }
            }
            )
            .exec()
            .then(data=>{
                if(data.nModified == 1){
                    res.status(200).json({ updated : true });
                }else{
                    res.status(200).json({ updated : false });
                }
            })
            .catch(err =>{
                res.status(500).json({ error: err });
            });
        }
    })
    .catch((err)=>{
        res.status(500).json({
            error: err
        });
    })
};

exports.deleteEntity = (req,res,next)=>{
    EntityMaster.deleteOne({_id:req.params.entityID})
    .exec()
    .then(data=>{
        res.status(200).json({ deleted : true });
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};


exports.deleteLocation = (req,res,next)=>{   
    EntityMaster.updateOne(
            { _id:req.params.entityID},  
            {
                $pull: { 'locations' : {_id:req.params.locationID}}
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

exports.deleteContact = (req,res,next)=>{   
    EntityMaster.updateOne(
            { _id:req.params.entityID},  
            {
                $pull: { 'contactPersons' : {_id:req.params.contactID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(200).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
};

exports.filterEntities = (req,res,next)=>{
    // var selector = {
    //         "locations":{ $elemMatch: { stateCode : "MH" }}, 
    //         "locations":{ $elemMatch: { district : "Pune" }},
    //         "companyName" :  {$regex : "^i",$options: "i"} 
    //     };


    var selector = {}; 
    selector['$and']=[];

    selector["$and"].push({ entityType : { $regex : req.body.entityType,$options: "i"} })
    //selector.entityType = {$regex : req.body.entityType,$options: "i"}  
    if (req.body.stateCode) {
        selector["$and"].push({ locations : { $elemMatch: { stateCode : req.body.stateCode } }  })
        //selector.locations = { $elemMatch: { stateCode : req.body.stateCode } }     
    }
    if (req.body.district) {
        selector["$and"].push({ locations : { $elemMatch: { district : { $regex : req.body.district, $options: "i"} } }  })
    }
    if (req.body.initial && req.body.initial != 'All') {
        //selector.companyName = {$regex : "^"+req.body.initial,$options: "i"} 
        selector["$and"].push({ companyName : { $regex : "^"+req.body.initial,$options: "i"}   })
    }
    if (req.body.searchStr && req.body.searchStr != '') {
        selector['$or']=[];
        if (req.body.initial && req.body.initial != 'All') {
            selector["$and"].push({ companyName : { $regex : "^"+req.body.initial,$options: "i"}   })
        }
        
        selector["$or"].push({ companyName : { $regex : req.body.searchStr, $options: "i"}  })
        selector["$or"].push({ groupName   : { $regex : req.body.searchStr, $options: "i"}  })
        selector["$or"].push({ locations   : { $elemMatch: { addressLine1 : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { area : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { district : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { stateCode : { $regex : req.body.searchStr, $options: "i"} } }  })
    }

    EntityMaster.find(selector)
    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.filterEntities_grid = (req,res,next)=>{
    
    var selector = {}; 
    selector['$and']=[];

    selector["$and"].push({ entityType : { $regex : req.body.entityType,$options: "i"} })
    if (req.body.stateCode) {
        selector["$and"].push({ locations : { $elemMatch: { stateCode : req.body.stateCode } }  })
    }
    if (req.body.district) {
        selector["$and"].push({ locations : { $elemMatch: { district : { $regex : req.body.district, $options: "i"} } }  })
    }
    if (req.body.initial && req.body.initial != 'All') {
        selector["$and"].push({ companyName : { $regex : "^"+req.body.initial,$options: "i"}   })
    }
    if (req.body.searchStr && req.body.searchStr != '') {
        selector['$or']=[];
        if (req.body.initial && req.body.initial != 'All') {
            selector["$and"].push({ companyName : { $regex : "^"+req.body.initial,$options: "i"}   })
        }
        
        selector["$or"].push({ companyName : { $regex : req.body.searchStr, $options: "i"}  })
        selector["$or"].push({ groupName   : { $regex : req.body.searchStr, $options: "i"}  })
        selector["$or"].push({ locations   : { $elemMatch: { addressLine1 : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { area : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { district : { $regex : req.body.searchStr, $options: "i"} } }  })
        selector["$or"].push({ locations   : { $elemMatch: { stateCode : { $regex : req.body.searchStr, $options: "i"} } }  })
    }

    EntityMaster.find(selector)
    .sort({createdAt : -1})
    .skip(req.body.startRange)
    .limit(req.body.limitRange)
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.fetchEntities = (req, res, next)=>{
    EntityMaster.find({entityType:req.body.type})
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
exports.CompanyfromEntities = (req, res, next)=>{
    EntityMaster.find({})
        .sort({createdAt : -1})
        .select("companyName")
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};


