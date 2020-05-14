const mongoose	        = require("mongoose");
const BrandMaster     = require('./ModelBrandMaster.js');


exports.insertBrand = (req,res,next)=>{
    processData();
    async function processData(){
    var allBrands = await fetchBrands()
        var brand = allBrands.filter((data)=>{
        if (data.brand.trim().toLowerCase() == req.body.fieldValue.trim().toLowerCase()) {
            return data;
        }
        })
        if (brand.length > 0) {
            res.status(200).json({ duplicated : true });
        }else{
            const brandMaster = new BrandMaster({
                            _id                         : new mongoose.Types.ObjectId(),
                            brand                       : req.body.fieldValue,
                            createdBy                   : req.body.createdBy,
                            createdAt                   : new Date()
                        })
                        brandMaster.save()
                        .then(data=>{
                            res.status(200).json({ created : true, fieldID : data._id });
                        })
                        .catch(err =>{
                            console.log("err",err.code)
                            if (err.code == 11000) {
                                res.status(200).json({ duplicated : true });
                            }else{
                                res.status(500).json({ error: err });
                            }
                             
                        });
        }
    }       
};
var fetchBrands = async ()=>{
    return new Promise(function(resolve,reject){ 
    BrandMaster.find({})
        .exec()
        .then(data=>{
            resolve( data );
        })
        .catch(err =>{
            reject(err);
        }); 
    });
};
exports.countBrands = (req, res, next)=>{
    BrandMaster.find({}).count()
        .exec()
        .then(data=>{
            res.status(200).json({ count : data });
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.fetchBrands = (req, res, next)=>{
    BrandMaster.find({})
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
exports.getBrands = (req, res, next)=>{
    BrandMaster.find({})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({ error: err });
    }); 
};
exports.fetchSingleBrand = (req, res, next)=>{
    BrandMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};

exports.searchBrand = (req, res, next)=>{
    BrandMaster.find({ brand: { $regex : req.params.str ,$options: "i" }  })
        .exec()
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};
exports.updateBrand = (req, res, next)=>{
    BrandMaster.updateOne(
            { _id:req.body.fieldID },  
            {
                $set:   {  'brand'       : req.body.fieldValue  }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                BrandMaster.updateOne(
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
exports.deleteBrand = (req, res, next)=>{
    BrandMaster.deleteOne({_id: req.params.fieldID})
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



