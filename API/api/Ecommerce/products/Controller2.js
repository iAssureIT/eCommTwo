const mongoose      = require("mongoose");
const Products      = require('./Model');
const FinishedGoods = require('../PurchaseManagement/models/FinishedGoodsEntry.js');
var   ObjectId      = require('mongodb').ObjectID;

exports.getfranchisestock = (req,res,next)=>{
    Products.find({status:"Publish"})
            .then(products=>{
                FinishedGoods
                    .aggregate([
                        {"$match" : {"balance" : {"$gt" : 0 } } },
                        {"$group" : {
                                    "_id": {"prodcode" : "$ProductCode", "itemcode" : "$ItemCode"},
                                    "total": {$sum: "$balance"}
                         }}
                    ])
                    .then(finGoods=>{
                        console.log("finGoods = ",finGoods);
                        var franchiseStock = [];

                        products.forEach((element)=>{
                            let pCode = element.productCode ;
                            let iCode = element.itemCode ;
                            let currentStock = 0;

                            //Search in finGoods array
                            let obj = finGoods.find(o => o._id.prodcode === pCode && o._id.itemcode === iCode);
                            if(typeof obj !== "undefined"){
                                console.log(" obj = ",obj);
                                currentStock = obj.total;
                            }

                            franchiseStock.push({
                                                    productCode: pCode,
                                                    itemCode : iCode,
                                                    productName : element.productName,
                                                    currentStock : currentStock, 
                                                    unit: element.unit,
                                                    section: element.section,
                                                    category : element.category,
                                                    subcategory : element.subcategory,
                                                });

                        });

                        if(franchiseStock.length > 0){
                            console.log("franchiseStock = ",franchiseStock);
                            res.status(200).json(franchiseStock);                            
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
};

