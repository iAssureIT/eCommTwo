const mongoose	= require("mongoose");

const PurchaseEntry = require('../models/PurchaseEntry');
const EntityMaster = require('../../../coreAdmin/entityMaster/ModelEntityMaster');
const Products      = require('../../products/Model');
const FailedRecords = require('../../failedRecords/Model');
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
      // console.log("purchaseNumber----=",data);
       res.status(200).json(data);   
       
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
}

/*code by madhuri start*/

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
}

exports.raw_material_bulk_upload = (req,res,next)=>{
    const moment = require('moment-timezone');
    var purchaseNumber = req.body.reqdata.purchaseNumber;
    var record = []; 
    var i = 0;
    var found = 0;
    var failedRecords = [];
    getData();
    async function getData(){
        var productData = req.body.data;
        var TotalCount  = 0;
        var Count  = 0;
        var DuplicateCount  = 0;
        var invalidData = [];
        var invalidObjects = [];
        var remark = ''; 

      //  console.log("test",productData,req.body.reqdata);

        for(k = 0 ; k < productData.length ; k++){
            productData[k].purchaseNumber = req.body.reqdata.purchaseNumber;
                      //  console.log("productData",productData[k]);
                if (productData[k].product.trim() != '') {
                    //var sectionObject = await sectionInsert(productData[k].section)
                  //  //console.log('sectionObject',sectionObject)
                    if (productData[k].product != undefined && productData[k].productCode != undefined && productData[k].itemCode != undefined) {
                        var productPresent = await findProduct(productData[k].itemCode,productData[k].product);
                         if (productPresent) {
                            var purchaseDate = moment(productData[k].purchaseDate).format("YYYY-MM-DD");
                            if(moment(new Date(purchaseDate), "YYYY-MM-DD").isValid()){
                               if(typeof productData[k].unitRate  === 'number' && isFinite(productData[k].unitRate )){
                                   if(typeof productData[k].quantity  === 'number' && isFinite(productData[k].quantity )){
                                        if(typeof productData[k].amount  === 'number' && isFinite(productData[k].amount)){
                                            var insertPurchaseEntryObj = await insertPurchaseEntry(productData[k]);
                                            if (insertPurchaseEntryObj != 0) {
                                                Count++;
                                            }else{
                                                remark += insertPurchaseEntryObj.err;
                                                invalidObjects =  productData[k];
                                                invalidObjects.failedRemark = remark;
                                                invalidData.push(invalidObjects);
                                            }
                                        }else{
                                            remark += "Amount should be number and not empty";
                                            invalidObjects =  productData[k];
                                            invalidObjects.failedRemark = remark;
                                            invalidData.push(invalidObjects);
                                       }
                                   }else{
                                        remark += "Quantity should be number and not empty";
                                        invalidObjects =  productData[k];
                                        invalidObjects.failedRemark = remark;
                                        invalidData.push(invalidObjects);
                                   }
                               }else{
                                    remark += "Unit rate should be number and not empty";
                                    invalidObjects =  productData[k];
                                    invalidObjects.failedRemark = remark;
                                    invalidData.push(invalidObjects);
                               }
                            }else{
                                remark += "Purchase date should be in YYYY-MM-DD formart";
                                invalidObjects =  productData[k];
                                invalidObjects.failedRemark = remark;
                                invalidData.push(invalidObjects);
                            }

                         }else{


                         }
                    }
                }
       console.log("invalidData",moment(productData[k].purchaseDate).format("YYYY-MM-DD"));                
        if (productData[k].itemCode != undefined) {
            TotalCount++;
            if(productData[k].productCode == undefined){
                 remark += "Product Code not found";
            }
            if (productData[k].purchaseDate == undefined) {
                if(!moment(new Date(purchaseDate), "YYYY-MM-DD").isValid()){
                    remark += ", Purchase date should be in YYYY-MM-DD formart, ";
                }else{
                     remark += ", Purchase Date not found, ";
                }
               
            }
            if (productData[k].unitRate == undefined) {
                remark += "Unit Rate not found, ";
            }
            if (productData[k].quantity == undefined) {
                remark += "Quantity not found, ";
            }
            if (productData[k].amount == undefined) {
                remark += "Amount not found, ";
            }
            if (productData[k].product == undefined) {
                remark += "Product Name not found, ";
            }
        }
            

            if (remark != '') {
                invalidObjects = productData[k];
                invalidObjects.remark = remark;
                invalidData.push(invalidObjects);
            } 
            remark = '';
        }
        
        failedRecords.FailedRecords = invalidData
        failedRecords.fileName = req.body.fileName;
        failedRecords.totalRecords = TotalCount;

        console.log("failedRecords",req.body.fileName);
        await insertFailedRecords(failedRecords); 
        
         var msgstr = "";
        if (Count > 0) {
               msgstr =  " " + Count+" products are added successfully";         
        }else{
            msgstr = "Failed to add products";
        }
        res.status(200).json({
            "message": msgstr,
            "completed": true
        });
    }
};

function findProduct(itemCode, productName) {
    return new Promise(function(resolve,reject){  
    Products.findOne(
                { "$or": 
                    [
                    {"productName"    : {'$regex' : '^' + productName , $options: "i"} },
                    {"itemCode"       : itemCode },
                    ]
                })

                .exec()
                .then(productObject=>{
                    if(productObject){
                        resolve(1);
                    }else{
                        resolve(0);
                    }
                })
    })           
}

exports.filedetails = (req,res,next)=>{
    var finaldata = {};
    console.log(req.params.fileName)
    PurchaseEntry.find({fileName:req.params.fileName})
    .exec()
    .then(data=>{
        //finaldata.push({goodrecords: data})
        finaldata.goodrecords = data;
        FailedRecords.find({fileName:req.params.fileName})  
            .exec()
            .then(badData=>{
                console.log("baddata",badData);
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

var insertPurchaseEntry = async (data) => {
    // console.log('Data',data);
    return new Promise(function(resolve,reject){ 
        insertPurchaseEntryControl();
        async function insertPurchaseEntryControl(){
             const purchaseEntry = new PurchaseEntry({
                    _id                       : new mongoose.Types.ObjectId(),                    
                    purchaseDate              : data.purchaseDate,
                    purchaseStaff             : data.purchaseStaff,
                    purchaseLocation          : data.purchaseLocation,
                    itemCode                  : data.ItemCode,
                    productName               : data.productName,
                    quantity                  : data.quantity,
                    unit                      : data.unit,
                    amount                    : data.amount,
                    unitRate                  : data.unitRate,
                    Details                   : data.Details,
                    purchaseNumber            : data.purchaseNumber,
                    createdBy                 : data.createdBy,
                    createdAt                 : new Date()
                });
                purchaseEntry.save()
                .then(data=>{
                   resolve(data._id);
                })
                .catch(err =>{
                    console.log(err);
                    reject(err);
                });
                
        }
    })
}



var insertFailedRecords = async (invalidData) => {
    console.log("insertFailedRecords");
     console.log('invalidData',invalidData.fileName);
    return new Promise(function(resolve,reject){ 
    FailedRecords.find({fileName:invalidData.fileName})  
            .exec()
            .then(data=>{
            if(data.length>0){
                console.log('data',data)   
                if (data[0].failedRecords.length>0) {
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





    //     // console.log("record",validData);

    //     BeneficiaryFamilies.insertMany(validData)
    //     .then(data=>{
    //         // console.log("data",data);
    //     })
    //     .catch(err =>{
    //         console.log("err",err);
    //     });
            
    //     failedRecords.FailedRecords = invalidData
    //     failedRecords.fileName = req.body.fileName;
    //     failedRecords.totalRecords = req.body.totalRecords;

    //     await insertFailedRecords(failedRecords,req.body.updateBadData);
    //     // console.log("newfamilyLst",newfamilyLst);
    //     if(k >= families.length){
    //         //res.status(200).json({"uploadedData": newfamilyLst,"message":"Families Uploaded Successfully"})
    //     }

    //     var msgstr = "";
    //     if (DuplicateCount > 0 && Count > 0) {
    //         if (DuplicateCount > 1 && Count > 1) {
    //            msgstr =  " " + Count+" families are added successfully and "+"\n"+DuplicateCount+" families are duplicate";
    //         }
    //         else if(DuplicateCount ==1 && Count == 1 ){
    //             msgstr =  " " + Count+" family is added successfully and "+"\n"+DuplicateCount+" family is duplicate";
    //         }
    //         else if(DuplicateCount > 1 && Count == 1)
    //         {
    //             msgstr =  " " + Count+" family is added successfully and "+"\n"+DuplicateCount+" families are duplicate";
    //         }else if(DuplicateCount == 1 && Count > 1){
    //             msgstr =  " " + Count+" families are added successfully and "+"\n"+DuplicateCount+" family is duplicate";
    //         }
    //     }
    //     else if(DuplicateCount > 0 && Count == 0)
    //     {
    //         if (DuplicateCount > 1) {
    //             msgstr = "Failed to add families as "+DuplicateCount+" families are duplicate";
    //         }else{
    //             msgstr = "Failed to add families as "+DuplicateCount+" family is duplicate";
    //         }
            
    //     }
    //     else if(DuplicateCount == 0 && Count > 0)
    //     { 
    //         if (Count > 1) {
    //             msgstr = " " + Count+" families are added successfully";
    //         }else{
    //             msgstr = " " + Count+" family is added successfully";
    //         }            
    //     }else{
    //         msgstr = "Failed to add families";
    //     }
    //     res.status(200).json({
    //         "message": msgstr,
    //         "completed": true
    //     });
    // }    



// var fetchBeneficiaryFamilies = async (center_ID)=>{
//     return new Promise(function(resolve,reject){ 
//         BeneficiaryFamilies.find({center_ID:center_ID})
//         .exec()
//         .then(data=>{
//             resolve(data);            
//         })
//         .catch(err =>{
//             console.log(err);
//             reject(err); 
//         });
//     })
// }
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




/*code by madhuri end*/

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

