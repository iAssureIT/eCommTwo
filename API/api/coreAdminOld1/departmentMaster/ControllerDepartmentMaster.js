const mongoose	        = require("mongoose");
const DepartmentMaster     = require('./ModelDepartmentMaster.js');


exports.insertDepartment = (req,res,next)=>{
    processData();
    async function processData(){
    var allDepartments = await fetchDepartments();
    var department = allDepartments.filter((data)=>{
        if (data.department.trim().toLowerCase() == req.body.fieldValue.trim().toLowerCase()) {
            return data;
        }
        })    

        if (department.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const departmentMaster = new DepartmentMaster({
                                _id                         : new mongoose.Types.ObjectId(),
                                department                  : req.body.fieldValue,
                                createdBy                   : req.body.createdBy,
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
var fetchDepartments = async ()=>{
    return new Promise(function(resolve,reject){ 
    DepartmentMaster.find({})
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
    DepartmentMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
}; 
exports.fetchDepartments = (req, res, next)=>{
    DepartmentMaster.find({})
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
    DepartmentMaster.find({})
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
    DepartmentMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.searchDepartment = (req, res, next)=>{
    DepartmentMaster.find({ department : { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateDepartment = (req, res, next)=>{
    DepartmentMaster.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {  'department'       : req.body.fieldValue  }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                DepartmentMaster.updateOne(
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
    DepartmentMaster.deleteOne({_id: req.params.fieldID})
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



