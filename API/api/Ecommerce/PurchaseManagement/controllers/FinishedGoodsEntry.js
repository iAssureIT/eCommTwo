const mongoose	= require("mongoose");

const FinishedGoodsEntry = require('../models/FinishedGoodsEntry');

exports.insert_FinishedGoodsEntry = (req,res,next)=>{
	/*PurchaseEntry.find({"purchaseStaff":req.body.purchaseEntry})
		.exec()
		.then(data =>{
            console.log(req.body)
            if(data && data.length > 0){
                res.status(200).json({
                    "message": "PurchaseEntry already exists."
                });
            }else{*/
                const finishedGoods = new FinishedGoodsEntry({
                    _id                       : new mongoose.Types.ObjectId(),                    
                    Date                      : req.body.Date,
                    itemId                    : req.body.itemId,/*itemID from productMaster*/
                    productName               : req.body.productName,
                    PackageWeight             : req.body.PackageWeight,
                    Quantity                  : req.body.Quantity,
                    Unit                      : req.body.Unit,
                    createdBy                 : req.body.createdBy,
                    createdAt                 : new Date()
                });
                finishedGoods.save()
                .then(data=>{
                    res.status(200).json({
                        "message": "Finished Goods Entry Submitted Successfully."
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
    FinishedGoodsEntry.findOne({"_id":req.params.fetchId})
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
exports.update_FinishedGoodsEntry = (req,res,next)=>{
    FinishedGoodsEntry.updateOne(
            { _id:req.params.purchaseID},  
            {
                $set:{
                    purchaseDate              : req.body.purchaseDate,
                    itemId                    : req.body.itemId,/*itemID from productMaster*/
                    productName               : req.body.productName,
                    PackageWeight             : req.body.PackageWeight,
                    Quantity                  : req.body.Quantity,
                    Unit                      : req.body.Unit,
                    createdBy                 : req.body.createdBy,
                    createdAt                 : new Date()
                }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({
                    "message": "Finished Goods Entry Updated Successfully."
                });
            }else{
                res.status(401).json({
                    "message": "Finished Goods Entry Not Found"
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
exports.list_FinishedGoodsEntry = (req, res, next)=>{
    FinishedGoodsEntry.find({})
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
exports.delete_FinishedGoodsEntry = (req,res,next)=>{
    FinishedGoodsEntry.deleteOne({_id:req.params.purchaseID})
    .exec()
    .then(data=>{
        res.status(200).json({
            "message": "Finished Goods Entry Deleted Successfully."
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

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

