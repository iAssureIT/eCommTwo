const mongoose	= require("mongoose");

const FranchiseGoods = require('./Model');

exports.insert_franchise_goods = (req,res,next)=>{
        console.log(req.body);
            const franchiseGoods = new FranchiseGoods({
                _id                       : new mongoose.Types.ObjectId(),                    
                distributionDate          : req.body.distributionDate,
                deliveryChallanNo         : req.body.deliveryChallanNo,
                franchiseId               : req.body.franchiseId,
                purchaseOrderId           : req.body.purchaseOrderId,
                totalDemand               : req.body.totalDemand,
                totalSupply               : req.body.totalSupply,
                orderItems                : req.body.orderItems,
                createdBy                 : req.body.createdBy,
                createdAt                 : new Date()
            });
            franchiseGoods.save()
            .then(data=>{
                console.log("data",data);
                res.status(200).json({
                    "franchiseGoodsId":data._id,
                    "message": "purchaseEntry Submitted Successfully."
                });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
};


exports.get_delivery_challan = (req,res,next)=>{
        console.log(req.params.id);
        // FranchiseGoods.find({"_id" : req.params.id})
        // .exec()
        // .then(data=>{
        //     res.status(200).json(data);
        // })
        // .catch(err =>{
        //     console.log(err);
        //     res.status(500).json({
        //         error: err
        //     });
        // });

        FranchiseGoods.find({"_id":req.params.id})
        .exec()
        .then(data=>{
            if(data){
                res.status(200).json(data[0]);
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