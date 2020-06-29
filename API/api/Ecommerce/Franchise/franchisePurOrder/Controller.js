const mongoose       = require("mongoose");
var   ObjectId       = require('mongodb').ObjectID;
const EntityMaster   = require('../../../coreAdmin/entityMaster/ModelEntityMaster');
const FranchiseGoods = require('../../distributionManagement/Model');


const FranchisePO   = require('./Model');


exports.insert_franchisePO = (req,res,next)=>{    

    FranchisePO.find({})
    .sort({createdAt: -1})
    .exec()
    .then(data=>{
        if(data && data.length > 0){
            if (data[0].orderNo) {
                var orderNo = data[0].orderNo + 1;
            }else{
                var orderNo = 1000;
            }
        }else{
          var orderNo = 1000;
        }
        const franchisePO = new FranchisePO({
            _id                       : new mongoose.Types.ObjectId(), 
            franchise_id              : req.body.franchise_id, 
            companyID                 : req.body.companyID, 
            orderDate                 : req.body.orderDate, 
            orderItems                : req.body.orderItems,
            orderNo                   : orderNo,
            createdBy                 : req.body.user_id,
            createdAt                 : new Date()
        });

        franchisePO.save()
                .then(data => {
                    res.status(200).json({
                        "message"  : "Franchise Purchase Order Submitted Successfully",
                        "order_id" : data._id
                    });
                })
                .catch(err =>{
                    console.log("err0",err);
                    res.status(500).json({
                        error: err
                    });
                })
    })
    .catch(err =>{
        res.status(500).json({error:err})
    });  
    
};

exports.update_franchisePO = (req,res,next)=>{
    /* req.body = {
            purchaseorder_id : xxx,
            orderDate : "2020-06-06",
            orderItems : [
                {productID:xxx,itemCode:xxx,productName:xxx,orderedQty:xxx, units:xxx, suppliedQty: 0, status:xxx },
                {productID:xxx,itemCode:xxx,productName:xxx,orderedQty:xxx, units:xxx, suppliedQty: 0, status:xxx },
                {productID:xxx,itemCode:xxx,productName:xxx,orderedQty:xxx, units:xxx, suppliedQty: 0, status:xxx },
                {productID:xxx,itemCode:xxx,productName:xxx,orderedQty:xxx, units:xxx, suppliedQty: 0, status:xxx },
                {productID:xxx,itemCode:xxx,productName:xxx,orderedQty:xxx, units:xxx, suppliedQty: 0, status:xxx },
            ],
            user_id : xxx,
    } */
    // console.log("req.params=>",req.body);


    FranchisePO.updateOne( 
        { _id: req.body.purchaseorder_id }, 
        {
            $set: {
                orderDate                 : req.body.orderDate, 
                orderItems                : req.body.orderItems,
            },
            $push: {updateLog : {updatedBy : req.body.user_id, updatedAt : new Date() }  }
        },
    )
    .then(data =>{
        if(data.nModified == 1){
            res.status(200).json({
                "message": "Purchase Order Updated Successfully.",
            });
        }else{
            res.status(401).json({
                "message": "Purchase Order " + req.body.purchaseorder_id + " Not Found"
            });
        }
    })
    .catch(err =>{
        console.log("err1",err);
        res.status(500).json({
            error: err
        });
    });
};

exports.update_franchisePOitem = (req,res,next)=>{
    /* req.body = {
            purchaseorder_id : xxx,
            item : {productID:xxx,itemCode:xxx,productName:xxx,orderedQty:xxx, units:xxx, suppliedQty: 0, status:xxx },
            user_id : xxx,
    } */

    FranchisePO.findOne({_id : req.body.purchaseorder_id})
    .then(purchaseorder => {
        var orderItems = purchaseorder.orderItems;
        var index = orderItems.findIndex(item => item.itemCode == req.body.item.itemCode);
        orderItems[index].status = req.body.item.status;

        FranchisePO.updateOne( 
            { _id: req.body.purchaseorder_id }, 
            {
                $set: {orderItems : orderItems, },
                $push: {updateLog : {updatedBy : req.body.user_id, updatedAt : new Date() }  }                
            }
        )
        .then(data =>{
            if(data.nModified == 1){
                res.status(200).json({
                    "message": "Purchase Order ItemCode "+ req.body.item.itemCode +" Status Updated Successfully.",
                });
            }else{
                res.status(401).json({
                    "message": "Purchase Order " + req.body.purchaseorder_id + " Not Found"
                });
            }
        })
        .catch(err =>{
            console.log("err1",err);
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

exports.update_franchisePOaccept = (req,res,next)=>{
    /* req.body = {
            purchaseorder_id : xxx,
            user_id : xxx,
    } */

    FranchisePO.findOne({_id : req.body.purchaseorder_id})
    .then(purchaseorder => {
        var orderItems = purchaseorder.orderItems.map( orderItem => {orderItem.status = "Accepted"});
        
        FranchisePO.updateOne( 
            { _id: req.body.purchaseorder_id }, 
            {
                $set: {orderItems : orderItems, },
                $push: {updateLog : {updatedBy : req.body.user_id, updatedAt : new Date() }  }                
            }
        )
        .then(data =>{
            if(data.nModified == 1){
                res.status(200).json({
                    "message": "Purchase Order "+ req.body.purchaseorder_id +" Status Updated Successfully.",
                });
            }else{
                res.status(401).json({
                    "message": "Purchase Order " + req.body.purchaseorder_id + " Not Found"
                });
            }
        })
        .catch(err =>{
            console.log("err1",err);
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


exports.list_franchisePO = (req,res,next)=>{
    var franchise_id = req.params.franchise_id;
    var orderDate    = req.params.orderDate;

    FranchisePO
        .find({
                franchise_id : franchise_id, 
                orderDate : new Date(orderDate)
            })       
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


exports.list_allfranchisePO = (req,res,next)=>{
   var orderDate    = req.params.orderDate;
   FranchisePO.aggregate([
        {$match : { orderDate : new Date(orderDate)}},
        {$lookup: {from: "entitymasters",localField: "franchise_id",foreignField: "_id",as: "franchiseData"}},
        //{$unwind: "$franchisegoods"},
        //{$lookup: {from: "franchisegoods",localField: "_id",foreignField: "purchaseOrderId",as: "finishedGoodsData"}},
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
    // FranchisePO
    //     .find({
    //             orderDate : new Date(orderDate)
    //         })       
    //     .then(data=>{
    //         res.status(200).json(data);
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
};

exports.allFrachisePOData = (req,res,next)=>{   
    var orderDate    = req.params.orderDate;
    FranchisePO
        .find({ orderDate : new Date(orderDate) })       
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

exports.one_franchisePO = (req,res,next)=>{
    var purchaseorder_id    = req.params.purchaseorder_id;
   //  PurchaseEntry.aggregate([
   //      {$match : {"_id":req.params.fetchId}},
   //      {$lookup: {from: "entitymasters",localField: "franchise_id",foreignField: "_id",as: "franchiseData"}},
   // ])
    FranchisePO
        .findOne({_id : purchaseorder_id})
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


exports.delete_franchisePO = (req,res,next)=>{
    // console.log("req.params.purchaseorder_id",req.params.purchaseorder_id);
    var purchaseorder_id    = req.params.purchaseorder_id;

    FranchisePO
        .remove({_id : purchaseorder_id})
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
