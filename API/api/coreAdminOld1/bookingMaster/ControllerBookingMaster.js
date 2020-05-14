const mongoose	= require("mongoose");

const BookingMaster = require('./ModelBookingMaster');
var request = require('request-promise');
const gloabalVariable = require('../../nodemon.js');
var   ObjectId          = require('mongodb').ObjectID;

exports.insertBooking = (req,res,next)=>{
        const booking = new BookingMaster({
                    _id                         : new mongoose.Types.ObjectId(),
                    packageTypeId               : req.body.packageTypeId,
                    packageId                   : req.body.packageId,
                    tripType                    : req.body.tripType,
                    from                        : req.body.from,
                    to                          : req.body.to,
                    pickupDate                  : req.body.pickupDate,
                    pickupTime                  : req.body.pickupTime,
                    returnDate                  : req.body.returnDate,
                    returnTime                  : req.body.returnTime,    
                    vehicleCategoryId           : req.body.vehicleCategoryId,
                    employeeId                  : req.body.employeeId,
                    corporateId                 : req.body.corporateId,
                    managerId                   : req.body.managerId,
                    intermediateStops           : req.body.intermediateStops,
                    specialInstruction          : req.body.specialInstruction,
                    purposeOfTravelled          : req.body.purposeOfTravelled,
                    reasonForSelectingVehicle   : req.body.reasonForSelectingVehicle,
                    status                      : req.body.status,
                    statusValue                 : req.body.status.value,
                    createdBy                   : req.body.createdBy,
                    createdAt                   : new Date()
                })
                booking.save()
                .then(data=>{
                    res.status(200).json({ created : true, PersonId : data._id });
                })
                .catch(err =>{
                    res.status(500).json({ error: err }); 
                });
};



exports.countBookings = (req,res,next)=>{
    BookingMaster.find({type: req.params.type}).count()
        .exec() 
        .then(data=>{
            res.status(200).json({ count : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.fetchBookings = (req,res,next)=>{ 
    BookingMaster.aggregate([{
        $lookup:
            {
               from: "packagetypemasters",
               localField: "packageTypeId",
               foreignField: "_id",
               as: "packageType"
            }
        },
        {
        $lookup:
            {
               from: "packagemasters",
               localField: "packageId",
               foreignField: "_id",
               as: "package"
            }
        },
        { "$unwind": "$packageType" },{$addFields: { packageType : "$packageType.packageType"} },
        { "$unwind": "$package" },{$addFields: { packageName : "$package.packageName"} },
        { "$match" : req.body.selector }
        ])
        
        .sort({createdAt : -1})
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};


exports.getBookings = (req,res,next)=>{ 
    BookingMaster.find({statusValue:req.params.status})
        .sort({createdAt : -1})
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.singleBooking = (req, res, next)=>{
    BookingMaster.aggregate([
        { "$match" : {_id: ObjectId(req.params.bookingID)} },
        {
            $lookup:
            {
               from: "packagetypemasters",
               localField: "packageTypeId",
               foreignField: "_id",
               as: "packageType"
            }
        },
        {
            $lookup:
            {
               from: "packagemasters",
               localField: "packageId",
               foreignField: "_id",
               as: "package"
            }
        },
        {
            $lookup:
            {
               from: "users",
               localField: "employeeId",
               foreignField: "_id",
               as: "employee"
            }
        },
        {
            $lookup:
            {
               from: "vehiclemasters",
               localField: "vehicleCategoryId",
               foreignField: "_id",
               as: "vehicle"
            }
        },
        { "$unwind": "$packageType" },
        { "$unwind": "$package" },
        { "$unwind": "$employee" },
        { "$unwind": "$vehicle" },
        {
            $project: 
            {
                "_id"                 : 1,
                "status"              : 1,
                "statusValue"         : 1,
                "from"                : 1,
                "to"                  : 1,
                "pickupDate"          : 1,
                "pickupTime"          : 1,
                "returnDate"          : 1,
                "returnTime"          : 1,
                "intermediateStops"   : 1,
                "specialInstruction"  : 1,
                "tripExpenses"          : 1,
                "packageType"         : "$packageType.packageType",
                "packageName"         : "$package.packageName", 
                "employeeName"        : "$employee.profile.fullName", 
                "employeeMobile"      : "$employee.profile.mobile",
                "vehicleCategory"     : "$vehicle.category",
                "vehicleBrand"        : "$vehicle.brand",
                "vehicleModel"        : "$vehicle.model",
                "vehicleNumber"       : "$vehicle.vehicleNumber",
                "vehicleImage"        : "$vehicle.vehicleImage",
            } 
        },
        ])
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.updateBooking = (req, res, next)=>{
    BookingMaster.updateOne(
            { _id:req.body.bookingID },   
            {
                $set:   {   "packageTypeId"           : req.body.packageTypeId,
                            "packageId"               : req.body.packageId,
                            "tripType"                : req.body.tripType,
                            "from"                    : req.body.from,
                            "to"                      : req.body.to,
                            "pickupDate"              : req.body.pickupDate,
                            "pickupTime"              : req.body.pickupTime,
                            "returnDate"              : req.body.returnDate,
                            "returnTime"              : req.body.returnTime,    
                            "vehicleCategoryId"       : req.body.vehicleCategoryId,
                            "employeeId"              : req.body.employeeId,
                            "corporateId"             : req.body.corporateId,
                            "managerId"               : req.body.managerId,
                            //"intermediateStops"       : req.body.intermediateStops,
                            //"status"                  : req.body.status,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                BookingMaster.updateOne(
                { _id:req.body.bookingID},
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
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.deleteBooking = (req, res, next)=>{
    BookingMaster.deleteOne({_id: req.params.bookingID})
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
exports.filterBookings = (req,res,next)=>{
    var selector = {};
    
    for (var key in req.body) {
        if (key=='departments' && req.body.departments.length > 0) {
            selector.department =  { $in: req.body.departments } 
        }
        if (key=='designations' && req.body.designations.length > 0 ) {
            selector.designation =  { $in: req.body.designations } 
        }
        
        if (req.body.initial && req.body.initial != 'All') {
            selector.firstName = { $regex : "^"+req.body.initial,$options: "i"}
        }
    }
    selector.type = { $regex : req.body.type,$options: "i"}
    console.log(selector)
    BookingMaster.find(selector)
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

exports.updateStatus = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.bookingID },   
        {
            $push:  {   
                        "status"      : req.body.status,
                    },
            $set:  {   
                        "statusValue"   : req.body.status.value,
                    },

        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            BookingMaster.updateOne(
            { _id:req.body.bookingID},
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
        console.log(err);
        res.status(500).json({ error: err });
    });
}

//Get Status 
exports.getStatus = (req,res,next)=>{
    BookingMaster.aggregate([
      { 
        $match: { 
          "_id":ObjectId(req.params.bookingID)
        }
      },
      { 
        $project: {
          status: {
            $slice: [ "$status", -1 ] 
          }
        }
      }
    ])
    .exec()
    .then(data=>{
      res.status(200).json({data}); 
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: err });
    });
}


exports.insert_trip_expenses = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.bookingID },   
        {
            $set:   {   
                        "tripExpenses"                  : req.body.tripExpenses,
                    }
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            BookingMaster.updateOne(
            { _id:req.body.bookingID},
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
        console.log(err);
        res.status(500).json({ error: err });
    });
}


exports.update_routeCoordinates = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.bookingID},
        {
            $push : {
                "routeCoordinates" : req.body.routeCoordinates,
            },
        })
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
