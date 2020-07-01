const mongoose	= require("mongoose");

const FranchiseDelivery = require('./Model');
const FranchiseGoods = require('../Model');

exports.insert_franchise_delivery = (req,res,next)=>{
            getData();
            async function getData(){
                var dc_challan = await generate_delivery_Challan();
                //deliverySent, deliveryAccepted, deliveryRejected, deliveryCancelled
                const franchiseDelivery = new FranchiseDelivery({
                    _id                       : new mongoose.Types.ObjectId(),    
                    franchise_id              : req.body.franchise_id, 
                    franchisePO_id            : req.body.franchisePO_id,
                    deliveryDate              : new Date(), 
                    deliveredBy               : req.body.deliveredBy,          
                    deliveryChallanNum         : dc_challan,
                    supply                    : req.body.supply,
                    purchaseOrderId           : req.body.purchaseOrderId,
                    totalDemand               : req.body.totalDemand,
                    totalSupply               : req.body.totalSupply,
                    orderedDate               : req.body.orderedDate,
                    createdBy                 : req.body.createdBy,
                    createdAt                 : new Date()
                });
                franchiseDelivery.save()
                .then(data=>{
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
            }
};


exports.get_delivery_challan = (req,res,next)=>{
     // FranchiseDelivery.aggregate([
     //    { $lookup:
     //       {
     //        from: 'entitymasters',
     //        localField: 'franchise_id',
     //        foreignField: '_id',
     //        as: 'franchiseDetails'
     //       }
     //    },
     //    { $unwind : "$franchiseDetails" },
     //            { $match :  { "_id": req.params.id }},

     //   ])
        FranchiseDelivery.find({"_id":req.params.id})
        .exec()
        .then(data=>{
             res.status(200).json(data[0]);   
          })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
       
};

function generate_delivery_Challan() {
    // console.log("itemCode",itemCode,"productName",productName);
    return new Promise(function(resolve,reject){  
        FranchiseDelivery.findOne()
        .sort({ "createdAt": -1 })
        .exec()
        .then(data=>{
            if(data){
                console.log("data",data);
                 const  dcChallan = data.deliveryChallanNum.replace('DC','');
                 const number = Number(dcChallan) + Number(1);
                 dc_challan = "DC" + number;
             }else{
                 dc_challan = "DC" + 1;
             }
             console.log("generate_delivery_Challan",resolve);
             resolve(dc_challan);
            
        })
        .catch(err =>{ reject(err); }); 
    })         
}

exports.update_delivery_attribute = (req,res,next)=>{
    if (req.body.remark){
        remark = req.body.remark;
    }else{
        remark = '';
    }
    getData();
    async function getData(){
        FranchiseDelivery.updateOne(
         { "_id" : req.body.FranchiseDeliveryId, "supply.itemCode": req.body.itemcode }, 
         { "$set": { "supply.$.status": req.body.attribute,"supply.$.remark" : remark}}, 
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                if(req.body.attribute == "deliveryAccepted"){
                    //if accepted insert into frinchise goods
                    var updateFinishedGoods = update_franchise_goods(req.body.FranchiseDeliveryId,req.body.itemcode);
                }

                if(req.body.attribute == "deliveryRejected"){
                    //if accepted insert into frinchise goods
                    var deleteFromFinishedGoods = deletefrom_franchise_goods(req.body.FranchiseDeliveryId,req.body.itemcode);
                }

                res.status(200).json({
                    "message": "Success",
                });
            }else{
                res.status(401).json({
                    "message": "franchise delivery not found"
                });
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }  
};

var update_franchise_goods = async (franchiseDcId,itemCode) => {
     // console.log('manage_raw_material',rawdata);
    return new Promise(function(resolve,reject){ 
        updateFranchiseGoodsControl();
         async function updateFranchiseGoodsControl(){
        //        FranchiseDelivery.find({ "_id" : franchiseDcId, "supply.itemCode": itemCode,'supply.$': 1 })
        //       .sort({createdAt : 1})
              FranchiseDelivery.findOne(
                {
                  _id: franchiseDcId,
                  'supply.itemCode': itemCode
                }, 
                // {'supply.$': 1}
                )
               .then(franchiseData=>{
                   var productObj = franchiseData.supply.find(o => o.itemCode === itemCode);
                   var date = new Date();
                   var orderObj = {"orderNum":franchiseData.franchisePO_id, "orderDate":franchiseData.orderDate,"orderQty":productObj.orderedQty,"orderDeliveryStatus":productObj.status};
                    const franchiseGoods = new FranchiseGoods({
                        _id                       : new mongoose.Types.ObjectId(),    
                        franchise_id              : franchiseData.franchise_id, 
                        franchisePO_id            : franchiseData.franchisePO_id,
                        deliveryChallanNum        : franchiseData.deliveryChallanNum,
                        productCode               : productObj.productCode,
                        itemCode                  : productObj.itemCode,
                        productName               : productObj.productName,
                        inwardQty                 : productObj.suppliedQty,
                        unit                      : productObj.unit,
                        orders                    : [orderObj],
                        balance                   : productObj.suppliedQty,
                        createdBy                 : franchiseData.createdBy,
                        createdAt                 : new Date()
                    });
                    franchiseGoods.save()
                    .then(data=>{
                            if(data){
                                resolve(data);
                            }else{
                                resolve(data);
                            }
                    })
                    .catch(err =>{ reject(err); });
                })
               .catch(err =>{
                   console.log(err);
                   reject(err);
               });
           }
             
    })

}

var deletefrom_franchise_goods = async (franchiseDcId,itemCode) => {
     // console.log('manage_raw_material',rawdata);
    return new Promise(function(resolve,reject){ 
        deleteFranchiseGoodsControl();
         async function deleteFranchiseGoodsControl(){
              FranchiseDelivery.findOne(
                {
                  _id: franchiseDcId,
                  'supply.itemCode': itemCode
                }, 
                )
               .then(franchiseData=>{
                   FranchiseGoods.remove({"franchisePO_id" : franchiseData.franchisePO_id,"itemCode":itemCode})
                    .then(data=>{
                            if(data){
                                resolve(data);
                            }else{
                                resolve(data);
                            }
                    })
                    .catch(err =>{ reject(err); });
                })
               .catch(err =>{
                   console.log(err);
                   reject(err);
               });
           }
             
    })

}

