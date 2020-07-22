const mongoose      = require("mongoose");
const _             = require("underscore");
const Products      = require('../products/Model');
const Category      = require('../categories/Model');
const Sections      = require('../sections/Model');
const Orders        = require('../orders/Model');
const Carts         = require('../cart/Model');
const EntityMaster  =  require('../../coreAdmin/entityMaster/ModelEntityMaster');
var   ObjectId        = require('mongodb').ObjectID;
const franchisegoods = require('../distributionManagement/Model');


exports.list_products_by_category = (req,res,next)=>{
    Products.find({category_ID : req.params.categoryID, "status": "Publish"})
    .exec()
    .then(data=>{
        main();
        async function main(){
          for(i = 0 ; i < data.length ; i++){
             var franchiseStock = await get_current_stock_of_franchise(data[i].itemCode,req.params.franchiseId);
             data[i].availableQuantity = franchiseStock.totalStock ? franchiseStock.totalStock : 0;
          }
        res.status(200).json(data);
       }

    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

function get_current_stock_of_franchise(itemcode,franchiseId){
     return new Promise(function(resolve,reject){ 
     franchisegoods.find({itemCode : itemcode,franchise_id:franchiseId,balance: { $gt: 0 }})
     .then(data=>{
            var balanceArray = [];
            var balanceUnitArray = [];
            var balanceUnit;
            var finalArray = [];
            data.filter(function(item,index){
                balanceArray.push({"balance" :item.balance,"unit":item.unit});
            });

            balanceArray.filter(function(item,index){
                if(item.unit === "Kg"){
                    balanceUnitArray.push(item.balance);
                    balanceUnit = "Kg"
                }else{
                    if(item.unit == "Gm"){
                        var converToKG = item.balance/1000;
                        balanceUnitArray.push(converToKG);
                        //converted to kg so balanceunit is kg only
                        balanceUnit = "Kg";
                    }else{
                        balanceUnitArray.push(item.balance);
                        balanceUnit = item.unit;
                    }                    
                }
            });

            let totalBalance = balanceUnitArray.reduce(function(prev, current) {
                finalArray.push({"totalStock":current,"StockUnit":balanceUnit})
                return finalArray;
            }, 0);
            var sum = 0;
            finalArray.forEach(function(obj){
              sum += obj.totalStock;
            });
            resolve({"totalStock":sum,"StockUnit":balanceUnit});
       
    })
    .catch(err =>{
        reject(err);
    }); 
   })
}


exports.list_product_by_section = (req,res,next)=>{
    Products.find({section_ID : req.params.sectionID, "status": "Publish"})
    .exec()
    .then(data=>{
        main();
        async function main(){
          for(i = 0 ; i < data.length ; i++){
             var franchiseStock = await get_current_stock_of_franchise(data[i].itemCode,req.params.franchiseId);
             data[i].availableQuantity = franchiseStock.totalStock ? franchiseStock.totalStock : 0;
          }
        res.status(200).json(data);
       }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};


//generate bill number 
exports.generate_bill_number = (req,res,next)=>{
    var franchiseId = req.params.companyId;
    Carts.count()
        .exec()
        .then(cartData =>{
            console.log("cartData",cartData);
            var maxId = 1;
            Orders.count()
            .exec()
            .then(orderData =>{
                let calenderYear = new Date().getFullYear();
                if(cartData > orderData) {
                   maxId = cartData + 1;
                }else if(orderData > cartData){
                    maxId = orderData + 1;
                }else if(orderData == cartData){
                    maxId = orderData + 1;
                }else{
                    maxId = 1;
                }
                let str = maxId.toString().padStart(5, "0");

                let billNum = franchiseId + calenderYear + str;
                res.status(200).json(billNum); 
                    
            })
            .catch(err =>{
                res.status(500).json({
                    error: err
                });
            });
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
};


exports.list_product = (req,res,next)=>{
    Products.find({"status": "Publish"}).sort({'itemCode': 1})       
    .exec()
    .then(data=>{
       main();
        async function main(){
          const result = data.filter(product => product.availableQuantity > 0);
          res.status(200).json(result);
       }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.getCompany = (req,res,next)=>{
  EntityMaster.find({"companyID":req.params.companyID})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.getListBill = (req,res,next)=>{
  Orders.find({allocatedToFranchise:req.params.franchise_id,billNumber:{ $exists: true, $ne: null }})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};