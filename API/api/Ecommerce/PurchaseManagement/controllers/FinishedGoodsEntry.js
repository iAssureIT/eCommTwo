const mongoose	= require("mongoose");

const FinishedGoodsEntry = require('../models/FinishedGoodsEntry');
const PurchaseEntry = require('../models/PurchaseEntry');
const Products      = require('../../products/Model');
const FailedRecords = require('../../failedRecords/Model');

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
                console.log("body",req.body);
                getData();
                async function getData(){
                    var obj = {};
                    obj.date               = req.body.Date;
                    obj.productId          = req.body.productId;
                    obj.ItemCode           = req.body.ItemCode;
                    obj.OutwardRawMaterial = req.body.OutwardRawMaterial;
                    obj.OutwardUnit        = req.body.OutwardUnit;

                    const finishedGoods = new FinishedGoodsEntry({
                        _id                       : new mongoose.Types.ObjectId(),                    
                        Date                      : req.body.Date,
                        ItemCode                  : req.body.ItemCode,/*itemID from productMaster*/      
                        ProductCode               : req.body.ProductCode,
                        productName               : req.body.productName,
                        CurrentStock              : req.body.CurrentStock,
                        OutwardRawMaterial        : req.body.OutwardRawMaterial,
                        OutwardUnit               : req.body.OutwardUnit,
                        fgUnitQty                 : req.body.fgUnitQty,
                        fgUnitWt                  : req.body.fgUnitWt,
                        fgTotalQty                : req.body.fgTotalQty,
                        fgInwardQty               : req.body.fgInwardQty,
                        fgInwardUnit              : req.body.fgInwardUnit,
                        scrapQty                  : req.body.scrapQty,
                        scrapUnit                 : req.body.scrapUnit,
                        finishedBy                : req.body.finishedBy,
                        createdBy                 : req.body.createdBy,
                        createdAt                 : new Date(),
                    });

                    finishedGoods.save()
                    .then(data=>{
                         var manageRawMaterialObj = manage_raw_material(obj);
                         if(manageRawMaterialObj){

                         }else{
                            console.log("err");
                         }
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
                }
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
                    Date                      : req.body.Date,
                    ItemCode                  : req.body.ItemCode,/*itemID from productMaster*/      
                    ProductCode               : req.body.ProductCode,
                    productName               : req.body.productName,
                    CurrentStock              : req.body.CurrentStock,
                    OutwardRawMaterial        : req.body.OutwardRawMaterial,
                    OutwardUnit               : req.body.OutwardUnit,
                    fgUnitQty                 : req.body.fgUnitQty,
                    fgUnitWt                  : req.body.fgUnitWt,
                    fgTotalQty                : req.body.fgTotalQty,
                    fgInwardQty               : req.body.fgInwardQty,
                    fgInwardUnit              : req.body.fgInwardUnit,
                    scrapQty                  : req.body.scrapQty,
                    scrapUnit                 : req.body.scrapUnit,
                    finishedBy                : req.body.finishedBy,
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
    var selector = {};
    if(req.body.itemcode){
        selector = {ItemCode:req.body.itemcode,Date:req.body.date}
    }else{
        selector = {Date:req.body.date}
    }
    FinishedGoodsEntry.find(selector)
        .sort({createdAt : -1})
        .exec()
        .then(data=>{
            // console.log("data--",data);
            res.status(200).json(data);
        })
        .catch(err =>{
            console.log(err);
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

/*Code by madhuri*/

exports.get_total_outward = (req,res,next) => {
    FinishedGoodsEntry.aggregate([
       {"$match": { "ItemCode": req.params.itemcode}},
       {"$group": {"_id": null,"TotalOutward": { "$sum": "$OutwardRawMaterial"},"TotalScrap" : { "$sum": "$scrapQty"}}
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

exports.list_Products = (req,res,next) => {
    PurchaseEntry.aggregate([
         {$lookup:
                {
                    from: 'products',
                    localField: 'itemCode',
                    foreignField: 'itemCode',
                    as: 'ProductList'

                },
                
        },
      ])
     .then(data=>{
       res.status(200).json(data);   
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
}

exports.finished_goods_bulk_upload = (req,res,next)=>{
    const moment = require('moment-timezone');
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
        var date;
        for(k = 0 ; k < productData.length ; k++){
               if (typeof productData[k].Date == 'number') {
                    date = moment(new Date(Math.round((productData[k].Date - 25569)*86400*1000))).format("YYYY-MM-DD");
               }else{
                    date = moment(productData[k].purchaseDate,'YYYY-MM-DD')._i
               }
                productData[k].fileName = req.body.fileName;
                productData[k].Date = date;
                var validDate = moment(new Date(productData[k].Date), "YYYY-MM-DD").isValid();
                // console.log("date",productData[k].Date);
                if (productData[k].productName != '') {
                    if (typeof(productData[k].productName) != undefined && typeof(productData[k].productCode) != undefined && typeof(productData[k].itemCode) != undefined) {
                        var productPresent = await findProduct(productData[k].itemCode,productData[k].productName);
                         // console.log("productPresent",productPresent);
                         if (productPresent) {
                            if(validDate){
                                if(typeof productData[k].OutwardRawMaterial  === 'number'){
                                    if(typeof productData[k].OutwardUnit != undefined){
                                         if(typeof productData[k].fgUnitQty === 'number'){                                            
                                             if(typeof productData[k].fgUnitWt != undefined){
                                                if(typeof productData[k].fgTotalQty === 'number'){
                                                    if(typeof productData[k].fgUnitQtyforFG != undefined){
                                                        if(typeof productData[k].finishedGoodsUnit != undefined){
                                                            if(typeof productData[k].scrapQty === 'number'){
                                                                if(typeof productData[k].scrapUnit != undefined){
                                                                    if(typeof productData[k].finishedBy != undefined){
                                                                            var insertFinishedGoodsEntryObj = await insertFinishedGoodsEntry(productData[k]);
                                                                            if (insertFinishedGoodsEntryObj != 0) {
                                                                                Count++;
                                                                            }else{
                                                                                remark += insertFinishedGoodsEntryObj.err;
                                                                                invalidObjects =  productData[k];
                                                                                invalidObjects.failedRemark = remark;
                                                                                invalidData.push(invalidObjects);
                                                                            }
                                                                    }else{
                                                                         remark += "Finished By should not be empty";
                                                                         invalidObjects =  productData[k];
                                                                         invalidObjects.failedRemark = remark;
                                                                         invalidData.push(invalidObjects);
                                                                    }
                                                                }else{
                                                                     remark += "Scrap Unit should not be empty";
                                                                     invalidObjects =  productData[k];
                                                                     invalidObjects.failedRemark = remark;
                                                                     invalidData.push(invalidObjects);
                                                                }
                                                            }else{
                                                                 remark += "Scrap Quantity should not be number";
                                                                 invalidObjects =  productData[k];
                                                                 invalidObjects.failedRemark = remark;
                                                                 invalidData.push(invalidObjects);
                                                            }
                                                         }else{
                                                             remark += "Finish Goods Unit should not be empty";
                                                             invalidObjects =  productData[k];
                                                             invalidObjects.failedRemark = remark;
                                                             invalidData.push(invalidObjects);
                                                         } 
                                                     }else{
                                                        remark += "Finish Goods Unit for Quantity should not be empty";
                                                         invalidObjects =  productData[k];
                                                         invalidObjects.failedRemark = remark;
                                                         invalidData.push(invalidObjects);
                                                     } 
                                                 }else{
                                                    remark += "Finish Goods Total Quantity should not be empty";
                                                     invalidObjects =  productData[k];
                                                     invalidObjects.failedRemark = remark;
                                                     invalidData.push(invalidObjects);
                                                 }   
                                             }else{
                                                remark += "Finish Goods Unit Quantity should not be empty";
                                                 invalidObjects =  productData[k];
                                                 invalidObjects.failedRemark = remark;
                                                 invalidData.push(invalidObjects);
                                             }                                             }
                                        }else{
                                             remark += "Finish Goods Unit Quantity should be number and not empty";
                                             invalidObjects =  productData[k];
                                             invalidObjects.failedRemark = remark;
                                             invalidData.push(invalidObjects);
                                        }
                                    }else{
                                         remark += "Outward Raw Material should be number and not empty";
                                         invalidObjects =  productData[k];
                                         invalidObjects.failedRemark = remark;
                                         invalidData.push(invalidObjects);
                                    }
                                }else{
                                     remark += "Date should be in YYYY-MM-DD formart";
                                     invalidObjects =  productData[k];
                                     invalidObjects.failedRemark = remark;
                                     invalidData.push(invalidObjects);
                                }
                            }else{
                                remark += "Product Not Found";
                                invalidObjects =  productData[k];
                                invalidObjects.failedRemark = remark;
                                invalidData.push(invalidObjects);   
                            }

                         }else{


                         }
                    }
                
            if (productData[k].itemCode != undefined) {
                TotalCount++;
                if(productData[k].productCode == undefined){
                     remark += "Product Code not found";
                }
                if (productData[k].OutwardUnit == undefined) {
                    remark += "Outward Unit not found, ";
                }
                if (productData[k].fgTotalQty == undefined) {
                    remark += "Total Quantity not found, ";
                }
                if (productData[k].fgUnitQty == undefined) {
                    remark += "Unit Quantity not found, ";
                }
                if (productData[k].fgUnitWt == undefined) {
                    remark += "Unit Weight not found, ";
                }
                 if (productData[k].finishedBy == undefined) {
                    remark += "Finished By not found, ";
                }
                 if (productData[k].finishedGoodsUnit == undefined) {
                    remark += "finished Goods Unit not found, ";
                }
                 if (productData[k].fgUnitWt == undefined) {
                    remark += "Unit Weight not found, ";
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
    // console.log("itemCode",itemCode,"productName",productName);
    return new Promise(function(resolve,reject){  
      
    Products.findOne({"itemCode"       : itemCode },{productName: new RegExp('^'+productName+'$', "i")})
                .exec()
                .then(productObject=>{
                    if(productObject){
                        resolve(1);
                    }else{
                        resolve(0);
                    }
                })
                .catch(err =>{ reject(err); }); 
    })         
}

var insertFinishedGoodsEntry = async (data) => {
    // console.log('Data',data);
    return new Promise(function(resolve,reject){ 
        insertFinishedGoodsEntryControl();
        async function insertFinishedGoodsEntryControl(){
            //create object to mantain balance in raw material inward
            var obj = {};
            obj.date               = data.Date;
            obj.ItemCode           = data.itemCode;
            obj.OutwardRawMaterial = data.OutwardRawMaterial;
            obj.OutwardUnit        = data.OutwardUnit;

            const finishedGoods = new FinishedGoodsEntry({
                   _id                       : new mongoose.Types.ObjectId(),                    
                    Date                      : data.Date,
                    productName               : data.productName,
                    ItemCode                  : data.itemCode,/*itemID from productMaster*/      
                    ProductCode               : data.productCode,
                    CurrentStock              : data.CurrentStock,
                    OutwardRawMaterial        : data.OutwardRawMaterial,
                    OutwardUnit               : data.OutwardUnit,
                    fgUnitQty                 : data.fgUnitQty,
                    fgUnitWt                  : data.fgUnitWt,
                    fgTotalQty                : data.fgTotalQty,
                    fgInwardQty               : data.fgInwardQty,
                    fgInwardUnit              : data.fgInwardUnit,
                    scrapQty                  : data.scrapQty,
                    scrapUnit                 : data.scrapUnit,
                    fileName                  : data.fileName,
                    finishedBy                : data.finishedBy,
                    createdBy                 : data.createdBy,
                    createdAt                 : new Date(),
                });
                finishedGoods.save()
                .then(data=>{
                    //To update raw material balance
                    var manageRawMaterialObj = manage_raw_material(obj);
                     if(manageRawMaterialObj){

                     }else{
                        console.log("err");
                     }
                   resolve(data._id);
                })
                .catch(err =>{
                    console.log(err);
                    reject(err);
                });
                
        }
    })
}

var manage_raw_material = async (rawdata) => {
    // console.log('Data',data);
    return new Promise(function(resolve,reject){ 
        updateRawMaterialControl();
        async function updateRawMaterialControl(){
               PurchaseEntry.find({itemCode : rawdata.ItemCode,balance: { $gt: 0 }})
              .sort({createdAt : 1})
              .limit(1)
              .then(podata=>{
                        //check units and convert
                        // if balance and fc units are same
                        if(podata[0].balanceUnit == rawdata.OutwardUnit){
                            var remainingBalance = podata[0].balance - rawdata.OutwardRawMaterial;
                        }else{
                            //if units are different
                            if(podata[0].balanceUnit == 'Kg' && rawdata.OutwardUnit == "Gm"){
                                //convert raw material gram to kg formula kg=gm/1000
                               var convertToKg            = rawdata.OutwardRawMaterial/1000;
                               rawdata.OutwardRawMaterial = convertToKg;
                               rawdata.OutwardUnit        = podata[0].balanceUnit
                               var remainingBalance       = podata[0].balance - convertToKg;          
                            }
                            if(podata[0].balanceUnit == 'Gm' && rawdata.OutwardUnit == "Kg"){
                                //convert raw material kg to gram formula g=kg*1000
                                var convertToGram          = rawdata.OutwardRawMaterial*1000;
                                rawdata.OutwardRawMaterial = convertToGram;
                                rawdata.OutwardUnit        = podata[0].balanceUnit
                                var remainingBalance       = podata[0].balance - convertToGram;
                            }   

                        }


                       // compare and update raw material stock
                       if(podata[0].balance >= rawdata.OutwardRawMaterial){
                         // var remainingBalance = podata[0].balance - rawdata.OutwardRawMaterial;
                         rawdata.finishedGoods = rawdata;
                         rawdata.balance = remainingBalance;
                         finishedGoodsArray = {"Date":rawdata.date,"ItemCode":rawdata.ItemCode,"Quantity":rawdata.OutwardRawMaterial,"Unit":rawdata.OutwardUnit};
                            PurchaseEntry.update(
                            {    _id:podata[0]._id},  
                            {
                                 $set:   {'balance': remainingBalance} ,
                                 $push:  {'finishedGoodsArray' : finishedGoodsArray }                         
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
                            var remainFcQty =  rawdata.OutwardRawMaterial - podata[0].balance;
                            var remainingBalance = 0;
                            finishedGoodsArray = {"Date":rawdata.date,"ItemCode":rawdata.ItemCode,"Quantity":podata[0].balance,"Unit":rawdata.OutwardUnit};
                            PurchaseEntry.update(
                            {    _id:podata[0]._id},  
                            {
                                 $set:   {'balance': remainingBalance} ,
                                 $push:  {'finishedGoodsArray' : finishedGoodsArray }                         
                            })
                            .then(data=>{
                               PoUpObj = {"date":rawdata.date,"ItemCode":rawdata.ItemCode,"OutwardRawMaterial":remainFcQty,"OutwardUnit":rawdata.OutwardUnit};
                               // console.log("PoUpObj",PoUpObj);
                                if(data.nModified == 1){
                                    if(remainFcQty != 0){
                                         var updateOtherPoObj = updateOtherPo(PoUpObj);
                                         if(updateOtherPoObj){

                                         }else{
                                            console.log("err");
                                         }
                                    }
                                    resolve(data);
                                }else{
                                    resolve(data);
                                }
                            })
                            .catch(err =>{ reject(err); });
                            resolve(0);
                        }
               })
               .catch(err =>{
                   console.log(err);
                   reject(err);
               });
                
        }
    })
}

var updateOtherPo = async (rawdata) => {
    // console.log('Data',data);
    return new Promise(function(resolve,reject){ 
        updateOtherPoControl();
        async function updateOtherPoControl(){
            manage_raw_material(rawdata)
        }
    })
}





var update_raw_material_entry = async (data) => {
    // console.log("update_raw_material_entry",data);
    PurchaseEntry.updateOne({ _id:data._id},  
    { $set:   {'balance': data.balance},
      $push:  {'finishedGoodsArray' : data.finishedGoods } 
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

var insertFailedRecords = async (invalidData) => {
    return new Promise(function(resolve,reject){ 
    FailedRecords.find({fileName:invalidData.fileName})  
            .exec()
            .then(data=>{
            if(data.length>0){
                //console.log('data',data)   
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

exports.filedetails = (req,res,next)=>{
    var finaldata = {};
    FinishedGoodsEntry.find({fileName:req.params.fileName})
    .exec()
    .then(data=>{
        //finaldata.push({goodrecords: data})
        finaldata.goodrecords = data;
        FailedRecords.find({fileName:req.params.fileName})  
            .exec()
            .then(badData=>{
               // console.log("baddata",badData);
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

/*Code by madhuri*/


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

