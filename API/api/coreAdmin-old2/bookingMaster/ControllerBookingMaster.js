const mongoose = require("mongoose");

const BookingMaster     = require('./ModelBookingMaster');
const PersonMaster      = require('../personMaster/ModelPersonMaster');
var request             = require('request-promise');
const gloabalVariable   = require('../../nodemon.js');
var   ObjectId          = require('mongodb').ObjectID;
var moment              = require('moment');

exports.insertBooking = (req,res,next)=>{
    BookingMaster.find({})
    .sort({createdAt: -1})
    .exec()
    .then(data=>{
        if(data && data.length > 0){
          var bookingId = data[0].bookingId + 1;
        }else{
          var bookingId = 1;
        }
        const booking = new BookingMaster({
            _id                         : new mongoose.Types.ObjectId(),
            packageTypeId               : req.body.packageTypeId,
            packageId                   : req.body.packageId,
            contractId                  : req.body.contractId,
            bookingId                   : bookingId,
            tripType                    : req.body.tripType,
            from                        : req.body.from,
            to                          : req.body.to,
            pickupDate                  : req.body.pickupDate,
            pickupTime                  : req.body.pickupTime,
            returnDate                  : req.body.returnDate,
            returnTime                  : req.body.returnTime,   
            vehicleCategoryId           : req.body.vehicleCategoryId,
            vehicleID                   : req.body.vehicleID,
            employeeId                  : req.body.employeeId,
            employeeUserId              : req.body.employeeUserId,
            departmentId                : req.body.departmentId,
            corporateId                 : req.body.corporateId,
            managerId1                  : req.body.managerId1,
            managerId2                  : req.body.managerId2,
            managerId3                  : req.body.managerId3,
            approvalRequired            : req.body.approvalRequired,
            estimatedCost               : req.body.estimatedCost,
            intermediateStops           : req.body.intermediateStops,
            specialInstruction          : req.body.specialInstruction,
            purposeOfTravel             : req.body.purposeOfTravel,
            reasonForSelectingVehicle   : req.body.reasonForSelectingVehicle,
            status                      : req.body.status,
            statusValue                 : req.body.status.value,
            createdBy                   : req.body.createdBy,
            createdAt                   : new Date()
        })
        booking.save()
        .then(data=>{
            res.status(200).json({ created : true, bookingId : data._id,data:data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
    })
    .catch(err =>{
        res.status(500).json({error:err})
    })  
        
       
};

exports.getAllBookings = (req, res, next)=>{
    BookingMaster.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.getAllApprovalReqBookings = (req, res, next)=>{
    BookingMaster.aggregate([{ $match :{$or:
          [
            {"managerId1":ObjectId(req.params.managerId)},
            {"managerId2":ObjectId(req.params.managerId)},
            {"managerId3":ObjectId(req.params.managerId)}
          ]
        }},
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    { $match :{"approvalRequired" : "Yes"}},
    { $match :{"statusValue" :{$in:["New","Manager Approved","Manager Rejected","Cancel By Vendor","Cancel By User"]}}}
    ])

    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" :{$in:["New","Approved","Rejected","Cancel By Vendor","Cancel By User"]},"managerId":req.params.managerId})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.getDailyBooking = (req,res,next)=>{
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.date), $lt : new Date(req.body.nextDate) }}},
        {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
        },
        {$lookup:
        {
            from:"departmentmasters",
            localField: "departmentId",
            foreignField: "_id",
            as:"department"
        }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        }
    ])
    // BookingMaster.find({'createdAt':{$gte : req.body.date, $lt : req.body.nextDate }})
    // .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
},

exports.getWeeklyBooking = (req,res,next)=>{
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.monday), $lt : new Date(req.body.sunday) }}},
        {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         },
        },
        {$lookup:
        {
            from:"departmentmasters",
            localField: "departmentId",
            foreignField: "_id",
            as:"department"
        }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        }
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
},

exports.getMonthlyBooking = (req,res,next)=>{
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.start), $lt : new Date(req.body.end) }}},
        {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
        },
        {$lookup:
        {
            from:"departmentmasters",
            localField: "departmentId",
            foreignField: "_id",
            as:"department"
        }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        }
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
},
exports.getYearlyBooking = (req,res,next)=>{
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.start), $lt : new Date(req.body.end) }}},
        {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
        },
        {$lookup:
        {
            from:"departmentmasters",
            localField: "departmentId",
            foreignField: "_id",
            as:"department"
        }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        }
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
},
exports.getCustomBooking = (req,res,next)=>{
    BookingMaster.aggregate([
        {$match:{'createdAt':{$gte : new Date(req.body.from), $lt : new Date(req.body.to) }}},
        {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
        },
        {$lookup:
        {
            from:"departmentmasters",
            localField: "departmentId",
            foreignField: "_id",
            as:"department"
        }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId1",
            foreignField: "_id",
            as:"manager1"
        }
         },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId2",
            foreignField: "_id",
            as:"manager2"
         }
        },
        {$lookup:
        {
            from:"personmasters",
            localField: "managerId3",
            foreignField: "_id",
            as:"manager3"
         }
        }
    ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
},

exports.getAllBookingsForManager = (req, res, next)=>{
     BookingMaster.aggregate([
        { $match :{$or:
          [
            {"managerId1":ObjectId(req.body.managerId)},
            {"managerId2":ObjectId(req.body.managerId)},
            {"managerId3":ObjectId(req.body.managerId)}
          ]
        }},
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    { $match :{"approvalRequired" : "Yes"}},
    { $match :{"statusValue" :req.body.status}},
    ])
    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" :req.body.status,"managerId":req.body.managerId})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.getAllBookingsForAdmin = (req, res, next)=>{
     BookingMaster.aggregate([
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    // { $match :{"approvalRequired" : "Yes"}},
    ])
    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" :req.body.status,"managerId":req.body.managerId})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.getAllBookingsForAdmin_ByStatus = (req, res, next)=>{
     BookingMaster.aggregate([
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"categorymasters",
            localField: "vehicleCategoryId",
            foreignField: "_id",
            as:"category"
         }
    },
    { $match :{"statusValue" :req.params.status}},
    // { $match :{"approvalRequired" : "Yes"}},
    ])
    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" :req.body.status,"managerId":req.body.managerId})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.countBookings = (req,res,next)=>{
    // BookingMaster.find({createdBy: req.params.createdBy}).count()
    BookingMaster.find({ $or: [ { "createdBy": req.params.createdBy }, { "employeeUserId": req.params.createdBy } ] }).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.countAllBookings = (req,res,next)=>{
    BookingMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.getBookings_User = (req,res,next)=>{
    // BookingMaster.find({createdBy: req.params.userID})
    BookingMaster.find({ $or: [ { "createdBy": req.params.userID }, { "employeeUserId": req.params.userID } ] })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.getBookings_User_status = (req,res,next)=>{
    BookingMaster.find({ $or: [ { "createdBy": req.body.userId }, { "employeeUserId": req.body.userId } ] ,statusValue: req.body.status})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.getBookings_By_status = (req,res,next)=>{
    BookingMaster.find({statusValue: req.params.status})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.countApprovalReqBookings = (req,res,next)=>{
    BookingMaster.aggregate([
    {$match:
        {$or:
          [
            {"managerId1":ObjectId(req.params.managerId)},
            {"managerId2":ObjectId(req.params.managerId)},
            {"managerId3":ObjectId(req.params.managerId)}
          ]
        }
     },
     {$match:{"approvalRequired" : "Yes"}},
     {$match:{"statusValue" : {$in:["New","Manager Approved","Manager Rejected","Cancel By Vendor","Cancel By User"]}}},
     {$count:"count"}
    ])
    // BookingMaster.find({"approvalRequired" : "Yes","statusValue" : {$in:["New","Manager Approved","Manager Rejected","Cancel By Vendor","Cancel By User"]},"managerId1":req.params.managerId}).count()
        .exec()
        .then(data=>{
            res.status(200).json(data);
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
    if(req.params.status==="Running"){
        BookingMaster.find({
            $and: [
                    {
                        statusValue:{$in:["Started From Garage","Reached Pickup Location","Start From Pickup","Intermediate Stop","Reached Destination","Reached Drop Location","Reached Garage","Expense Submitted"]}
                    },
                    {
                        status: { $elemMatch: { allocatedToDriver: req.params.personId } }
                    }
                ]
        })
        .sort({createdAt : -1})
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
    }else{
        BookingMaster.find({
            $and: [
                    {
                        statusValue:req.params.status
                    },
                    {
                        status: { $elemMatch: { allocatedToDriver: req.params.personId } }
                    }
                ]
        })
        .sort({createdAt : -1})
        .then(data=>{
            res.status(200).json( data );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
    }
};

exports.getBookingByID = (req,res,next)=>{
    BookingMaster.find({_id: req.params.bookingID})
        .exec()
        .then(data=>{
            res.status(200).json({ data : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.matchBookingStatus = (req,res,next)=>{
   
    BookingMaster.aggregate([
        {$match:{"_id":ObjectId(req.params.bookingID)}},
        {$match:{$or:[{"statusValue":"Manager Rejected"},{"statusValue":"Manager Approved"}]}},
        {$project:{
           status: {$filter:{
               input:'$status',
               as: 'status',
               cond: { $or:[
                   {$eq: ['$$status.value','Manager Approved']},
                   {$eq: ['$$status.value','Manager Rejected']}
                ]
           }
       },
     }}
     }])
    // BookingMaster.find({_id: req.params.bookingID, status:{$elemMatch:{value:'Manager Approved'}}})
    .exec()
        .then(data=>{
            res.status(200).json({ data : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
},

exports.getBookingByID_empDetails = (req,res,next)=>{
    BookingMaster.aggregate([
        {"$match":{_id: ObjectId(req.params.bookingID)}},
        {
            $lookup:
            {
               from: "users",
               localField: "status[1].statusBy",
               foreignField: "_id",
               as: "user"
            }
        }
        ])
        .exec()
        .then(data=>{
            console.log('------------',data)
            res.status(200).json({ data : data } );
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.singleBookingForDriver = (req, res, next)=>{
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
               from: "personmasters",
               localField: "employeeId",
               foreignField: "_id",
               as: "employee"
            }
        },
        {
            $lookup:
            {
               from: "vehiclemasters",
               localField: "vehicleID",
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
                "bookingId"           : 1,
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
                "firstName"           : "$employee.firstName",
                "middleName"          : "$employee.middleName",
                "lastName"            : "$employee.lastName",
                "employeeMobile"      : "$employee.contactNo",
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
                            "contractId"              : req.body.contractId,
                            "tripType"                : req.body.tripType,
                            "from"                    : req.body.from,
                            "to"                      : req.body.to,
                            "pickupDate"              : req.body.pickupDate,
                            "pickupTime"              : req.body.pickupTime,
                            "returnDate"              : req.body.returnDate,
                            "returnTime"              : req.body.returnTime,   
                            "vehicleCategoryId"       : req.body.vehicleCategoryId,
                            "employeeId"              : req.body.employeeId,
                            "employeeUserId"          : req.body.employeeUserId,
                            "departmentId"            : req.body.departmentId,
                            "corporateId"             : req.body.corporateId,
                            "managerId1"               : req.body.managerId1,
                            "managerId2"               : req.body.managerId2,
                            "managerId3"               : req.body.managerId3,
                            "intermediateStops"       : req.body.intermediateStops,
                            "vehicleID"                   : req.body.vehicleID,
                            "estimatedCost"               : req.body.estimatedCost,
                            "specialInstruction"          : req.body.specialInstruction,
                            "purposeOfTravel"             : req.body.purposeOfTravel,
                            "reasonForSelectingVehicle"   : req.body.reasonForSelectingVehicle,
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
    if(req.body.vehicleID){
        var updateObj = {
            "vehicleID"     : req.body.vehicleID,
            "statusValue"   : req.body.status.value,
        }
    }else{
        var updateObj = {
            "statusValue"   : req.body.status.value,
        }
    }
    BookingMaster.updateOne(
        { _id:req.body.bookingID },  
        {
            $push:  {  
                        "status"      : req.body.status,
                    },
            $set:  updateObj,
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


exports.changeVehicle = (req,res,next)=>{
    BookingMaster.updateOne(
        { _id:req.body.bookingID },  
        {
            $set:  {
                        "vehicleID"   : req.body.vehicleID
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
                        "statusValue"                   : 'Expense Submitted'
                    },
            $push:  {
                       status:{
                            "value"    : 'Expense Submitted',
                            "statusBy" : req.body.updatedBy,
                            "statusAt" : new Date(),
                       }
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

//Billing API

exports.getAllBookingListForGenerateBill = (req,res,next)=>{
    BookingMaster.aggregate([
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
    },
    {$lookup:
        {
            from:"packagemasters",
            localField: "packageId",
            foreignField: "_id",
            as:"package"
         }
    },
    { "$match": { "status.value": "Driver Accepted" } },
   { "$lookup": {
     "from": "personmasters",
     "localField": "status.statusBy",
     "foreignField": "_id",
     "as": "driver"
   }},
    { $match :{"statusValue" :"Ready To Bill"}},
 //    {
 //        $group:{
 //            "_id":"$tripExpenses.ticketPrice"
 //           ,
 //         "Total Price : ":{
 //             $sum:{
 //                 $sum: "$tripExpenses.ticketPrice"
 //             }
 //         }
 //     }
 // },
    ])
    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });  
},

exports.getSingleBookingListForGenerateBill = (req,res,next)=>{
    BookingMaster.aggregate([
     {
        $match: {
          "_id":ObjectId(req.params.id)
        }
      },
    {$lookup:
        {
            from:"personmasters",
            localField: "employeeId",
            foreignField: "_id",
            as:"person"
         }
    },
    {$lookup:
        {
            from:"entitymasters",
            localField: "corporateId",
            foreignField: "_id",
            as:"company"
         }
    },
    {$lookup:
        {
            from:"expensetypemasters",
            localField: "tripExpenses.ticketName",
            foreignField: "type",
            as:"expense"
         }
    },
    { "$match": { "status.value": "Driver Accepted" } },
   { "$lookup": {
     "from": "personmasters",
     "localField": "status.statusBy",
     "foreignField": "_id",
     "as": "driver"
   }},
    { $match :{"statusValue" :"Ready To Bill"}},
 
    ])
    .sort({createdAt : -1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });  
},


//Vendor App API

exports.getbookingListForVendor = (req,res,next)=>{
    BookingMaster.find(
         {$and: [
            {
                statusValue:{ $in:req.body.status}
            },
            {
                status      : { $elemMatch: { allocatedToVendor: req.body.company_Id } }
            }
        ]}
    )
   .populate('corporateId')
   .populate('employeeId')
   .populate('vehicleCategoryId')
   .populate('vehicleID')
   .sort({updatedAt:1})
   .exec()
   .then(bookingList=>{
        main();
        async function main(){
            var k = 0 ;
            var returnData = [];
            for(k = 0 ; k < bookingList.length ; k++){
                if(bookingList[k].corporateId && bookingList[k].employeeId && bookingList[k].vehicleCategoryId){
                    // var driverInfo = bookingList[k].status.find(elem => elem.value === 'Vendor Allocated to Driver');
                    var driverInfo = bookingList[k].status.filter((elem)=>{return elem.value==="Vendor Allocated to Driver"});
                    console.log("driverInfo",driverInfo);
                    var driverDetails = {
                        firstName   : "",
                        middleName  : "",
                        lastName    : "",
                        contactNo   : "",
                    };
                    if( driverInfo && driverInfo.length > 0){
                        driverDetails = await getDriverDetails(driverInfo[driverInfo.length-1].allocatedToDriver);
                    }
                    returnData.push({
                        "_id"                     : bookingList[k]._id,
                        "bookingId"               : bookingList[k].bookingId,
                        "companyName"             : bookingList[k].corporateId.companyName,
                        "employeeName"            : bookingList[k].employeeId.firstName+" "+bookingList[k].employeeId.middleName+" "+bookingList[k].employeeId.lastName,
                        "vehicleCategory"         : bookingList[k].vehicleCategoryId.category,
                        "vehicle_id"              : bookingList[k].vehicleID ? bookingList[k].vehicleID._id : null,
                        "vehicleBrand"            : bookingList[k].vehicleID ? bookingList[k].vehicleID.brand : null ,
                        "vehicleModel"            : bookingList[k].vehicleID ? bookingList[k].vehicleID.model : null ,
                        "vehicleNumber"           : bookingList[k].vehicleID ? bookingList[k].vehicleID.vehicleNumber : null ,
                        "vehicleColor"            : bookingList[k].vehicleID ? bookingList[k].vehicleID.vehiclecolor : null ,
                        "driverDetails"           : driverDetails,
                        "statusValue"             : bookingList[k].statusValue,
                        "from"                    : bookingList[k].from,
                        "to"                      : bookingList[k].to,
                        "pickupDate"              : bookingList[k].pickupDate,
                        "pickupTime"              : bookingList[k].pickupTime,
                        "returnDate"              : bookingList[k].returnDate,
                        "returnTime"              : bookingList[k].returnDate,
                    })
                }
             }   
            if(k >= bookingList.length){
                res.status(200).json(returnData);
            }
        }    
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    });
};

function getDriverDetails(driver_id){
   return new Promise(function(resolve,reject){
        PersonMaster.findOne({"_id" : driver_id,"status":"active"},{"firstName":1,middleName:1,lastName:1,contactNo:1})
             .exec()
             .then(driverDetails=>{
                resolve(driverDetails);
             })
            .catch(err =>{
                res.status(500).json({
                    message : "driver not found.",
                    error: err
                   });
            });
    });
}

exports.singleBookingForVendor = (req, res, next)=>{
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
               from: "personmasters",
               localField: "employeeId",
               foreignField: "_id",
               as: "employee"
            }
        },
        {
            $lookup:
            {
               from: "categorymasters",
               localField: "vehicleCategoryId",
               foreignField: "_id",
               as: "category"
            }
        },
        { "$unwind": "$packageType" },
        { "$unwind": "$package" },
        { "$unwind": "$employee" },
        { "$unwind": "$category" },
        {
            $project:
            {
                "_id"                 : 1,
                "bookingId"           : 1,
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
                "tripExpenses"        : 1,
                "packageType"         : "$packageType.packageType",
                "packageName"         : "$package.packageName",
                "firstName"           : "$employee.firstName",
                "middleName"          : "$employee.middleName",
                "lastName"            : "$employee.lastName",
                "contactNo"           : "$employee.contactNo",
                "vehicleCategory"     : "$category.category",
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


exports.vehicleListForAllocation = (req, res, next)=>{
    BookingMaster.aggregate([
        { "$match" : {_id: ObjectId(req.params.bookingID)}},
        {
            $lookup:
            {
               from: "vehiclemasters",
               localField: "vehicleCategoryId",
               foreignField: "categoryId",
               as: "vehicles"
            }
        },
        { "$unwind": "$vehicles" },
        {
            $project:
            {
                "_id"                 : 1,
                "bookingId"           : 1,
                "pickupDate"          : 1,
                "pickupTime"          : 1,
                "returnDate"          : 1,
                "returnTime"          : 1,
                "vehicles"            : 1,
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
