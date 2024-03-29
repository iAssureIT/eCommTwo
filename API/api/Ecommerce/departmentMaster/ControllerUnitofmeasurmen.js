const mongoose	        = require("mongoose");
const Unitofmeasurment     = require('./ModelUnitofmeasurment.js');
// const FailedRecords     = require('../failedRecords/ModelFailedRecords');

exports.insertDepartment = (req,res,next)=>{
    processData();
    async function processData(){
    var allDepartments = await fetchDepartments();
    var department = allDepartments.filter((data)=>{
        if (data.department.trim().toLowerCase() == req.body.fieldValue.trim().toLowerCase() && data.companyID == req.body.companyID) {
            return data;
        }
        })    

        if (department.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const departmentMaster = new Unitofmeasurment({
                                _id                         : new mongoose.Types.ObjectId(),
                                companyID                   : req.body.companyID,
                                department                  : req.body.fieldValue,
                                createdBy                   : req.body.createdBy,
                                type                        : req.body.type,
                                createdAt                   : new Date()
                            })
                            departmentMaster.save()
                            .then(data=>{
                                res.status(200).json({ created : true, fieldID : data._id });
                            })
                            .catch(err =>{
                                res.status(500).json({ error: err }); 
                            });
        }
    }             
};
var fetchAllDepartments = async ()=>{
    return new Promise(function(resolve,reject){ 
    Unitofmeasurment.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
var fetchDepartments = async ()=>{
    return new Promise(function(resolve,reject){ 
    Unitofmeasurment.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
exports.countDepartments = (req, res, next)=>{
    Unitofmeasurment.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
}; 


exports.fetchDepartments = (req, res, next)=>{
    Unitofmeasurment.find({})
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

exports.getAllDepartments = (req, res, next)=>{
    Unitofmeasurment.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
           res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSingleDepartment = (req, res, next)=>{
    Unitofmeasurment.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.searchDepartment = (req, res, next)=>{
    Unitofmeasurment.find({ department : { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateDepartment = (req, res, next)=>{
    Unitofmeasurment.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {  'department'       : req.body.fieldValue  }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                Unitofmeasurment.updateOne(
                { _id:req.body.fieldID},
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
exports.deleteDepartment = (req, res, next)=>{
    Unitofmeasurment.deleteOne({_id: req.params.fieldID})
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
function insertDepartment(department, createdBy){
    return new Promise(function(resolve,reject){ 
        const departmentMaster = new Unitofmeasurment({
                        _id                         : new mongoose.Types.ObjectId(),
                        department                  : department,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    departmentMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}
var fetchAllDepartments = async (type)=>{
    return new Promise(function(resolve,reject){ 
    Unitofmeasurment.find()
        .sort({createdAt : -1})
        // .skip(req.body.startRange)
        // .limit(req.body.limitRange)
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        });
    });
}; 
var insertFailedRecords = async (invalidData,updateBadData) => {
     //console.log('invalidData',invalidData);
    return new Promise(function(resolve,reject){ 
    FailedRecords.find({fileName:invalidData.fileName})  
            .exec()
            .then(data=>{
            if(data.length>0){
                //console.log('data',data[0].failedRecords.length)   
                if (data[0].failedRecords.length>0) {
                    if (updateBadData) {
                        FailedRecords.updateOne({ fileName:invalidData.fileName},  
                        {   $set:   { 'failedRecords': [] } })
                        .then(data=>{
                        if(data.nModified == 1){
                            FailedRecords.updateOne({ fileName:invalidData.fileName},  
                                {   $set:   {'totalRecords': invalidData.totalRecords},
                                    $push:  { 'failedRecords' : invalidData.FailedRecords } 
                                })
                            .then(data=>{
                                if(data.nModified == 1){
                                    resolve(data);
                                }else{
                                    resolve(data);
                                }
                            })
                            .catch(err =>{ reject(err); });
                        }else{
                            resolve(0);
                        }
                        })
                        .catch(err =>{ reject(err); });
                    }else{
                        FailedRecords.updateOne({ fileName:invalidData.fileName},  
                                {   $set:   {'totalRecords': invalidData.totalRecords},
                                    $push:  { 'failedRecords' : invalidData.FailedRecords } 
                                })
                            .then(data=>{
                                if(data.nModified == 1){
                                    resolve(data);
                                }else{
                                    resolve(data);
                                }
                            })
                            .catch(err =>{ reject(err); });
                    }

                }else{
                    FailedRecords.updateOne({ fileName:invalidData.fileName},  
                        {   $set:   {'totalRecords': invalidData.totalRecords},
                            $push:  { 'failedRecords' : invalidData.FailedRecords } 
                        })
                    .then(data=>{
                        if(data.nModified == 1){
                            resolve(data);
                        }else{
                            resolve(data);
                        }
                    })
                    .catch(err =>{ reject(err); });
                }
            }else{
                    const failedRecords = new FailedRecords({
                    _id                     : new mongoose.Types.ObjectId(),                    
                    failedRecords           : invalidData.FailedRecords,
                    fileName                : invalidData.fileName,
                    totalRecords            : invalidData.totalRecords,
                    createdAt               : new Date()
                    });
                    
                    failedRecords
                    .save()
                    .then(data=>{
                        resolve(data._id);
                    })
                    .catch(err =>{
                        console.log(err);
                        reject(err);
                    });
            }
            })  
    
    })            
}


exports.bulkUploadDepartment = (req, res, next)=>{
    // var departments = [{department:"mesh"},{department:"mesh1"},{department:"mesh2"}];
    var departments = req.body.data;
    console.log("departments",departments);

    var validData = [];
    var validObjects = [];
    var invalidData = [];
    var invalidObjects = [];
    var remark = ''; 
    var failedRecords = [];
    var Count = 0;
    var DuplicateCount = 0;

    processData();
    async function processData(){
         // var alldepartments = await fetchDepartments();
        for(var k = 0 ; k < departments.length ; k++){
            if (departments[k].department == '-') {
                remark += "department not found, " ;  
            }
            console.log("remark",remark)

              if (remark == '') {
                // var allDepartments = await fetchAllDepartments(req.body.reqdata);
                // console.log("alldepartments",allDepartments);
                 console.log()
                  var alldepartments = await fetchAllDepartments(req.body.reqdata);
                  var departmentExists = alldepartments.filter((data)=>{
                    if (data.department == departments[k].department)
                         {
                        return data;
                    }
                })
               
                 console.log("in else validObjects",departmentExists);
                if (departmentExists.length==0) {
                    validObjects = departments[k];
                    validObjects.fileName       = req.body.fileName;
                    // validObjects.createdBy      = req.body.reqdata.createdBy;
                    validObjects.createdAt      = new Date();

                    validData.push(validObjects); 

                }else{
                    
                    remark += "Department already exists." ; 

                    invalidObjects = departments[k];
                    invalidObjects.failedRemark = remark;
                    invalidData.push(invalidObjects); 
                }
 
              
            }

        }
        Unitofmeasurment.insertMany(validData)
        .then(data=>{

        })
        .catch(err =>{
            console.log(err);
        });

        failedRecords.FailedRecords = invalidData;
        failedRecords.fileName = req.body.fileName;
        failedRecords.totalRecords = req.body.totalRecords;

        await insertFailedRecords(failedRecords,req.body.updateBadData);
        
        res.status(200).json({
            "message": "Bulk upload process is completed successfully!",
            "completed": true
        });
    }

};
exports.fetch_file_count = (req,res,next)=>{
    //PersonMaster.find({"type" : req.params.type})
    Unitofmeasurment.find( { _id : "fileName" } )
    .exec()
    .then(data=>{
        
        res.status(200).json(data.length);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
};
exports.fetch_file = (req,res,next)=>{ 
    Unitofmeasurment.find( { _id : "fileName"})
    .exec()
    .then(data=>{
        res.status(200).json(data.length);
        //res.status(200).json(data);
        })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });   
};
exports.filedetails = (req,res,next)=>{
    console.log('req',req,'res',res);
    var finaldata = {};
    console.log(req.params.fileName)
    Unitofmeasurment.find( { fileName:req.params.fileName  }
    )
    .exec()
    .then(data=>{
        //finaldata.push({goodrecords: data})
        finaldata.goodrecords = data;
        FailedRecords.find({fileName:req.params.fileName})  
            .exec()
            .then(badData=>{
                finaldata.failedRecords = badData[0].failedRecords
                finaldata.totalRecords = badData[0].totalRecords
                res.status(200).json(finaldata);
            })
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};


exports.bulkUploadEmployee = (req, res, next)=>{
    var departments = req.body.data;
    console.log("departments",departments);

    var validData = [];
    var validObjects = [];
    var invalidData = [];
    var invalidObjects = [];
    var remark = ''; 
    var failedRecords = [];
    var Count = 0;
    var DuplicateCount = 0;

    processData();
    async function processData(){
         var alldepartments = await fetchDepartments();
        for(var k = 0 ; k < departments.length ; k++){
            if (departments[k].department == '-') {
                remark += "department not found, " ;  
            }

              if (remark == '') {
                var departmentId, designationId;
                // check if department exists
                var departmentExists = alldepartments.filter((data)=>{
                    if (data.department.trim().toLowerCase() == departments[k].department.trim().toLowerCase()) {
                        return data;
                    }
                })
                if (departmentExists.length>0) {
                    departmentId = departmentExists[0]._id;
                }else{
                    departmentId = await insertDepartment(departments[k].department.trim(), req.body.reqdata.createdBy);
                    //departmentId = departmentExists[0]._id;
                }

              
            }

        }
    }

};
exports.fetch_file = (req,res,next)=>{ 
    Unitofmeasurment.aggregate([
        { $match : { "type" : req.body.type } },
        { $group : { _id : "$fileName", count : {$sum: 1  } } }
        ])
    .exec()
    .then(data=>{
        res.status(200).json(data.slice(req.body.startRange, req.body.limitRange));
        //res.status(200).json(data);
        })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });   
};
exports.filedetails = (req,res,next)=>{
    var finaldata = {};
    console.log(req.params.fileName)
    // Unitofmeasurment.find({ $match : { type: req.params.type, fileName:req.params.fileName } })
    Unitofmeasurment.find( { fileName:req.params.fileName  } )
    .exec()
    .then(data=>{
        //finaldata.push({goodrecords: data})
        finaldata.goodrecords = data;
        FailedRecords.find({fileName:req.params.fileName})  
            .exec()
            .then(badData=>{
                finaldata.failedRecords = badData[0].failedRecords
                finaldata.totalRecords = badData[0].totalRecords
                res.status(200).json(finaldata);
            })
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};




