const mongoose	        = require("mongoose");
const ModelMaster       = require('./ModelMasterModel.js');


exports.insertModel = (req,res,next)=>{
    processData();
    async function processData(){
    var allModels = await fetchModels();

    var model = allModels.filter((data)=>{
        if ( data.brandId == req.body.dropdownID && data.model.trim().toLowerCase() == req.body.fieldValue.trim().toLowerCase()) {
            return data;
        }
        })
        if (model.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const modelMaster = new ModelMaster({
                                _id                         : new mongoose.Types.ObjectId(),
                                brandId                     : req.body.dropdownID,
                                model                       : req.body.fieldValue,
                                createdBy                   : req.body.createdBy,
                                createdAt                   : new Date()
                            })
                            modelMaster.save()
                            .then(data=>{
                                res.status(200).json({ created : true, fieldID : data._id });
                            })
                            .catch(err =>{
                                res.status(500).json({ error: err }); 
                            });
        }
    }          
};

var fetchModels = async ()=>{
    return new Promise(function(resolve,reject){ 
    ModelMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};

exports.countModels = (req, res, next)=>{
    ModelMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchModels = (req, res, next)=>{
    ModelMaster.aggregate([
    {
    $lookup:
        {
           from: "brandmasters",
           localField: "brandId",
           foreignField: "_id",
           as: "brand"
        }
    },
    { "$unwind": "$brand" },{$addFields: { brandName : "$brand.brand"} }])
        .sort({createdAt : -1})
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data=>{
            var alldata = data.map((a, i)=>{
                    // console.log("a ",a);
                    return {
                        "_id"                : a._id,
                        "brandName"          : a.brandName,
                        "model"              : a.model,
                        "brandId"            : a.brandId  
                    }
            })
            res.status(200).json(alldata);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.getModels = (req, res, next)=>{
    ModelMaster.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchSingleModel = (req, res, next)=>{
    ModelMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.searchModel = (req, res, next)=>{
    ModelMaster.aggregate([
    {
    $lookup:
        {
           from: "brandmasters",
           localField: "brandId",
           foreignField: "_id",
           as: "brand"
        }
    },
    { "$unwind": "$brand" },
    { $addFields: { brandName : "$brand.brand"} },
    { $match : { model: { $regex : req.params.str ,$options: "i" } } }

    ])
    //ModelMaster.find({ model: { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateModel = (req, res, next)=>{
    ModelMaster.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {   'brandId'                     : req.body.dropdownID,
                            'model'                       : req.body.fieldValue
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                ModelMaster.updateOne(
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
exports.deleteModel = (req, res, next)=>{
    ModelMaster.deleteOne({_id: req.params.fieldID})
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



