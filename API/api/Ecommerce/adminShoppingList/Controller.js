const mongoose      = require("mongoose");
var   ObjectId      = require('mongodb').ObjectID;

const AdminPO   = require('./Model');


exports.insert_adminPO = (req,res,next)=>{    

         // console.log("req.body orderNo",req.body);

        const adminPO = new AdminPO({
            _id                       : new mongoose.Types.ObjectId(), 
            franchise_id              : req.body.franchise_id, 
            companyID                 : req.body.companyID, 
            orderDate                 : req.body.orderDate, 
            orderItems                : req.body.orderItems,
            orderNo                   : req.body.orderNo,
            createdBy                 : req.body.user_id,
            createdAt                 : new Date()
        });

        adminPO.save()
        .then(data => {
            res.status(200).json({
                "message"  : "Admin Purchase Order Submitted Successfully",
                "order_id" : data._id
            });
        })
        .catch(err =>{
            console.log("err0",err);
            res.status(500).json({
                error: err
            });
        })
  
    };

exports.list_adminPO = (req,res,next)=>{
    var franchise_id = req.params.franchise_id;
    var orderDate    = req.params.orderDate;

    AdminPO
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

exports.one_adminPO = (req,res,next)=>{
    var purchaseorder_id    = req.params.purchaseorder_id;

    AdminPO
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

exports.delete_adminPO = (req,res,next)=>{
    // console.log("req.params.purchaseorder_id",req.params.purchaseorder_id);
    var purchaseorder_id    = req.params.purchaseorder_id;

    AdminPO
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