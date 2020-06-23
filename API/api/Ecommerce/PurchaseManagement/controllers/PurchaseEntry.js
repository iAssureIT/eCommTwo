const mongoose	= require("mongoose");

const PurchaseEntry = require('../models/PurchaseEntry');
const EntityMaster = require('../../../coreAdmin/entityMaster/ModelEntityMaster');

exports.insert_purchaseEntry = (req,res,next)=>{
	/*PurchaseEntry.find({"purchaseStaff":req.body.purchaseEntry})
		.exec()
		.then(data =>{
            console.log(req.body)
            if(data && data.length > 0){
                res.status(200).json({
                    "message": "PurchaseEntry already exists."
                });
            }else{*/
                const purchaseEntry = new PurchaseEntry({
                    _id                       : new mongoose.Types.ObjectId(),                    
                    purchaseDate              : req.body.purchaseDate,
                    purchaseStaff             : req.body.purchaseStaff,
                    purchaseLocation          : req.body.purchaseLocation,
                    /*productId                 : req.body.productId,
                    itemId                    : req.body.itemId,*/
                    itemCode                  : req.body.ItemCode,
                    productName               : req.body.productName,
                    quantity                  : req.body.quantity,
                    unit                      : req.body.unit,
                    amount                    : req.body.amount,
                    unitRate                  : req.body.unitRate,
                    Details                   : req.body.Details,
                    purchaseNumber            : req.body.purchaseNumber,
                    createdBy                 : req.body.createdBy,
                    createdAt                 : new Date()
                });
                purchaseEntry.save()
                .then(data=>{
                    res.status(200).json({
                        "message": "purchaseEntry Submitted Successfully."
                    });
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
   /*         }
	})
	.catch(err =>{
		console.log(err);
		res.status(500).json({
			error: err
		});
	});*/
};
exports.fetch_one = (req,res,next)=>{
    PurchaseEntry.findOne({"_id":req.params.fetchId})
        .exec()
        .then(data=>{
            if(data){
                res.status(200).json(data);
            }else{
                res.status(404).json('PAGE_NOT_FOUND');
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};   
exports.update_PurchaseEntry = (req,res,next)=>{
    PurchaseEntry.updateOne(
            { _id:req.params.purchaseID},  
            {
                $set:{
                    purchaseDate              : req.body.purchaseDate,
                    purchaseStaff             : req.body.purchaseStaff,
                    purchaseLocation          : req.body.purchaseLocation,
                    productId                 : req.body.productId,
                    itemId                    : req.body.itemId,
                    productName               : req.body.productName,
                    quantity                  : req.body.quantity,
                    unit                      : req.body.unit,
                    amount                    : req.body.amount,
                    unitRate                  : req.body.unitRate,
                    Details                   : req.body.Details,
                    purchaseNumber            : req.body.purchaseNumber,
                    createdBy                 : req.body.createdBy,
                    createdAt                 : new Date()
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({
                    "message": "PurchaseEntry Updated Successfully."
                });
            }else{
                res.status(401).json({
                    "message": "PurchaseEntry Not Found"
                });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.get_datewise_purchaceEntry = (req, res, next)=>{
    console.log("req body = ",req.body);
    const purchaseDate = req.body.purchaseDate;
    var selector = {};
    if(typeof(req.body.purchaseNumber) != "undefined" && typeof(req.body.productName) != "undefined"){
        selector ={"purchaseDate":req.body.purchaseDate,"purchaseNumber":req.body.purchaseNumber,"productName":req.body.productName};
    }else{
        if(typeof(req.body.purchaseNumber) != "undefined"){
            selector ={"purchaseDate":req.body.purchaseDate,"purchaseNumber":req.body.purchaseNumber};
        }else if(typeof(req.body.productName) != "undefined"){
            selector ={"purchaseDate":req.body.purchaseDate,"productName":req.body.productName};
        }else{
            selector ={"purchaseDate":req.body.purchaseDate};
        }
    }

    PurchaseEntry.find(selector)
    .then(data=>{
       console.log("data----=",data);
       res.status(200).json(data);   
       
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    function getUserData(user_id){
        return new Promise(function(resolve,reject){
            User.findOne({_id : ObjectId(user_id)})
                .then(staff => {
                      resolve(staff);
                })
                .catch()
        })
    }
};
exports.list_purchaseEntry = (req, res, next)=>{
    PurchaseEntry.find({})
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            console.log("data--",data);
            res.status(200).json(data);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.delete_purchaseEntry = (req,res,next)=>{
    PurchaseEntry.deleteOne({_id:req.params.purchaseID})
    .exec()
    .then(data=>{
        res.status(200).json({
            "message": "PurchaseEntry Deleted Successfully."
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};
exports.get_purchase_numbers = (req,res,next)=>{
    PurchaseEntry.distinct( "purchaseNumber" )
    .then(data=>{
       console.log("purchaseNumber----=",data);
       res.status(200).json(data);   
       
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
}

exports.get_total_inward = (req,res,next) => {
    PurchaseEntry.aggregate([
       {"$match": { "itemCode": req.params.itemcode}},
       {"$group": {"_id": null,"TotalInward": { "$sum": "$quantity"}}
    }])
     .then(data=>{
       res.status(200).json(data[0]);   
       
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 




 //       { $group: { _id : null, total: { $sum: "$quantity" }}},



      // PurchaseEntry.find({"itemCode":req.params.itemcode})
      //   .exec()
      //   .then(data=>{
      //       if(data){
      //           res.status(200).json(data);   
      //       }else{
      //           res.status(404).json('PAGE_NOT_FOUND');
      //       }
      //   })
      //   .catch(err =>{
      //       console.log(err);
      //       res.status(500).json({
      //           error: err
      //       });
      //   });
}

/*exports.list_category = (req,res,next)=>{
    Category.find({"section_ID":req.params.section_ID})
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
};*/
/*exports.list_category_with_limits = (req,res,next)=>{
   
    Category.find()
    .skip(parseInt(req.body.startRange))
    .limit(parseInt(req.body.limitRange))
    .exec()
    .then(data=>{
        console.log('data', data);
        var allData = data.map((x, i)=>{
            return {
                "_id"                   : x._id,
                "section"               : x.section,
                "category"              : x.category,
                "subCategory"           : ((x.subCategory.map((a, i)=>{return '<p>'+a.subCategoryTitle+'</p>'})).toString()).replace(/,/g, " "),
                "categoryDescription"   : x.categoryDescription,
                "categoryImage"         : x.categoryImage,
                "categoryIcon"          : x.categoryIcon,
            }
        })
        res.status(200).json(allData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};*/

/*exports.searchCategory = (req,res,next)=>{
    Category.find({
        $or: [
                { "section": { "$regex": req.body.searchText, $options: "i" } },
                { "category": { "$regex": req.body.searchText, $options: "i" } },
                { "categoryDescription": { "$regex": req.body.searchText, $options: "i" } },
            ]
    })
    .skip(parseInt(req.body.startRange))
    .limit(parseInt(req.body.limitRange))
    .exec()
    .then(data=>{
        console.log('data', data);

        var allData = data.map((x, i)=>{
            return {
                "_id"                   : x._id,
                "section"               : x.section,
                "category"              : x.category,
                "subCategory"           : ((x.subCategory.map((a, i)=>{return '<p>'+a.subCategoryTitle+'</p>'})).toString()).replace(/,/g, " "),
                "categoryDescription"   : x.categoryDescription,
                "categoryImage"         : x.categoryImage,
                "categoryIcon"          : x.categoryIcon,
            }
        })

        res.status(200).json(allData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};*/

/*exports.searchCategoryCount = (req,res,next)=>{
    // console.log(req.body.startRange, req.body.limitRange);
    Category.find({
        $or: [
                { "section": { "$regex": req.body.searchText, $options: "i" } },
                { "category": { "$regex": req.body.searchText, $options: "i" } },
                { "categoryDescription": { "$regex": req.body.searchText, $options: "i" } },
            ]
    })
    
    .exec()
    .then(data=>{
        res.status(200).json({"dataCount":data.length});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};*/

/*exports.count_category = (req,res,next)=>{
    Category.find({})
    .exec()
    .then(data=>{
        res.status(200).json({"dataCount":data.length});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};*/
/*exports.fetch_category = (req,res,next)=>{
    Category.findOne({_id : req.params.categoryID})
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
};*/

/*exports.fetch_categories_by_section = (req,res,next)=>{
    Category.find({ section_ID: req.params.sectionID})
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
};*/

