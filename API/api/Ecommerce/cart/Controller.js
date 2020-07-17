const mongoose	= require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const Carts = require('../cart/Model');
const Orders = require('../orders/Model');

const _ = require('underscore');    
exports.insert_cartid = (req,res,next)=>{
	Carts.findOne({"user_ID": req.body.user_ID})
		.exec()
		.then(cartData =>{
            if(cartData){
                Carts.findOne({"user_ID": req.body.user_ID, 'cartItems.product_ID':req.body.product_ID})
                .exec()
                .then(productData =>{
                    if(productData){
                        // req.body.quantity
                        Carts.updateOne(
                            {'_id':cartData._id,'cartItems.product_ID':req.body.product_ID},
                            {
                                $inc:{
                                    'cartItems.$.quantity':req.body.quantity,
                                    'cartItems.$.totalWeight':req.body.totalWeight,
                                },
                            }
                        )
                        .exec()
                        .then(data=>{
                            if(data.nModified == 1){
                                res.status(200).json({
                                    "message": "Product added to cart successfully.",
                                });
                            }else{
                                res.status(401).json({
                                    "message": "Cart Not Found 1"
                                });
                            }
                        })
                        .catch(err =>{
                            // console.log('1',err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }else{
                        var cartArr = {
                            'product_ID' : req.body.product_ID,
                            'quantity'   : req.body.quantity,
                            'totalWeight': req.body.totalWeight,
                            'rate'       : req.body.rate ? req.body.rate : 0,
                            'discountPercent'   : req.body.discount ? req.body.discount : 0,
                            'discountedPrice'       : req.body.discountedPrice ? req.body.discountedPrice : 0
                        }
                        Carts.updateOne(
                            {'_id':cartData._id},
                            {
                                $push:{
                                    'cartItems' : cartArr,
                                },
                            }
                        )
                        .exec()
                        .then(data=>{
                            if(data.nModified == 1){
                                res.status(200).json({
                                    "message": "Product added to cart successfully.",
                                });
                            }else{
                                res.status(401).json({
                                    "message": "Cart Not Found 1"
                                });
                            }
                        })
                        .catch(err =>{
                            // console.log('2',err);
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                })
                .catch(err =>{
                    // console.log('3',err);
                    res.status(500).json({
                        error: err
                    });
                });
            }else{
                var cartItems = [{
                    "product_ID"    : req.body.product_ID,
                    "quantity"      : req.body.quantity,
                    "totalWeight"   : req.body.totalWeight,
                    'rate'          : req.body.rate ? req.body.rate : 0,
                    'discountPercent'      : req.body.discount ? req.body.discount : 0,
                    'discountedPrice'       : req.body.discountedPrice ? req.body.discountedPrice : 0
                }];
                const cartDetails = new Carts({
                    _id             : new mongoose.Types.ObjectId(),  
                    "user_ID"       :   req.body.user_ID,
                    "cartItems"     :   cartItems,
                });
                cartDetails.save()
                .then(data=>{
                    res.status(200).json({
                        "message"   : "Product added to cart successfully.",
                        "cartCount" : 1
                    });
                })
                .catch(err =>{
                    // console.log('4',err);
                    res.status(500).json({
                        error: err
                    });
                });
                return true;
            }
		
	})
	.catch(err =>{
        // console.log('5',err);
		res.status(500).json({
			error: err
		});
	});
};


exports.list_cart = (req,res,next)=>{
    Carts.find({"user_ID": req.params.user_ID})       
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
exports.list_cart_product = (req,res,next)=>{
    // console.log(req.params.user_ID);
    Carts.aggregate([
        { "$match" : { "user_ID" : ObjectId(req.params.user_ID) } },
        { "$unwind": "$cartItems" },
        { "$lookup": {
            "from": "products",
            "as": "cartItems.productDetail",
            "localField": "cartItems.product_ID",
            "foreignField": "_id"
        }},
        { "$unwind": "$cartItems.productDetail" },
        {
            "$addFields": {
                "cartItems.subTotal": { "$sum": { "$multiply": [ "$cartItems.quantity", "$cartItems.productDetail.discountedPrice" ] } },
                "cartItems.saving":  { "$divide": [{ "$multiply": [ { "$multiply": [ "$cartItems.quantity", "$cartItems.productDetail.originalPrice" ] }, "$cartItems.productDetail.discountPercent" ]}, 100] } ,
            }
        },
        { "$group": {
            "_id": "$_id",
            "paymentMethod":{ "$first": "$paymentMethod" },
            "deliveryAddress":{ "$first": "$deliveryAddress" },
            "cartItems": { "$push": "$cartItems" },
            "cartTotal": { "$sum": { "$multiply": [ "$cartItems.quantity", "$cartItems.productDetail.originalPrice" ] } },
            "discount": { "$sum":{ "$divide": [{ "$multiply": [ { "$multiply": [ "$cartItems.quantity", "$cartItems.productDetail.originalPrice" ] }, "$cartItems.productDetail.discountPercent" ]}, 100] }},
            "total": { "$sum": { "$multiply": [ "$cartItems.quantity", "$cartItems.productDetail.discountedPrice" ] } },
            "cartQuantity":{ "$sum": "$cartItems.quantity" },
            }
        },
            
    ])
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
exports.all_list_cart = (req,res,next)=>{
    Carts.find()       
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

exports.count_cart = (req,res,next)=>{
    Carts.findOne({"user_ID": req.params.user_ID})     
        .exec()
        .then(data=>{
            res.status(200).json(data.cartItems.length);

        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
};

exports.remove_cart_items = (req, res, next)=>{
    // console.log('r', req.body);
    Carts.updateOne(
        {"user_ID": req.body.user_ID},
        {
			$pull: { "cartItems": { "_id": req.body.cartItem_ID } }
		}
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            res.status(200).json({
                "message": "Product removed from cart successfully.",
            });
        }else{
            res.status(401).json({
                "message": "Cart Not Found 1"
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.change_cart_item_quantity = (req, res, next)=>{
    Carts.updateOne(
        {"user_ID":req.body.user_ID,'cartItems.product_ID':req.body.product_ID},
        {
            $set:{
                'cartItems.$.quantity'   : parseInt(req.body.quantityAdded),
                'cartItems.$.totalWeight': req.body.totalWeight,
            },
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            res.status(200).json({
                "message": "Product quantity changed successfully."
            });
        }else{
            res.status(401).json({
                "message": "Cart Not Found 1"
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.add_address_to_cart = (req, res, next)=>{
    Carts.findOne({"user_ID": req.body.user_ID})       
        .exec()
        .then(cartData=>{
            if(cartData){
                Carts.updateOne({ "_id" : cartData._id },
                { $set : 
                    {
                        deliveryAddress : {
                            "name"            : req.body.name,
                            "email"           : req.body.email,
                            "addressLine1"    : req.body.addressLine1,
                            "addressLine2"    : req.body.addressLine2,
                            "pincode"         : req.body.pincode,
                            "city"            : req.body.city,
                            "stateCode"       : req.body.stateCode,
                            "state"           : req.body.state,
                            "district"        : req.body.district,
                            "mobileNumber"    : req.body.mobileNumber,
                            "countryCode"     : req.body.countryCode,
                            "country"         : req.body.country,
                            "addType"         : req.body.addType,
                            "latitude"        : req.body.latitude,
                            "longitude"       : req.body.longitude,
                        }
                    }
                }) 
                .exec()
                .then(data=>{
                    // if(data.nModified == 1){
                        res.status(200).json({
                            "message": "Address added to cart successfully."
                        });
                    // }else{
                    //     res.status(401).json({
                    //         "message": "Cart Not Found"
                    //     });
                    // }
                })
                .catch(err =>{
                    res.status(500).json({
                        error: err
                    });
                });
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
};

exports.list_cart=(req , res , next)=>{

    Carts.find({"user_ID": req.params.user_ID})
    .exec()
    .then(data =>{
        res.status(200).json(data);       
    })
    .catch(error =>{
        res.status(500).json({
            error:error
        })

    })

}
exports.user_cart=(req , res , next)=>{

    Carts.findOne({"user_ID": req.params.user_ID})
    .exec()
    .then(data =>{
        res.status(200).json(data);       
    })
    .catch(error =>{
        res.status(500).json({
            error:error
        })

    })

}
exports.add_paymentmethod_to_cart = (req, res, next)=>{
    Carts.updateOne({"user_ID": req.body.user_ID},
    { $set : 
        {
            "paymentMethod" : req.body.payMethod,
        }
    }) 
    .exec()
    .then(data=>{
        // if(data.nModified == 1){
            res.status(200).json({
                "message": "Payment Method added successfully."
            });
        // }else{
        //     res.status(401).json({
        //         "message": "Cart Not Found"
        //     });
        // }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};


//code by madhuri ghute

//Update products cart 
exports.update_cart_item = (req, res, next)=>{
     console.log("request",req);
    Carts.updateOne(
        {"user_ID":req.body.user_ID,'cartItems.product_ID':req.body.product_ID},
        {
            $set:{
                'cartItems.$.rate'              : req.body.rate,
                'cartItems.$.quantity'          : req.body.quantity,
                'cartItems.$.discountPercent'   : req.body.discountPercent,
                'cartItems.$.discountedPrice'   : req.body.discountedPrice,
            },
        }
    )
    .exec()
    .then(data=>{
        if(data.nModified == 1){
            res.status(200).json({
                "message": "Cart Product changed successfully."
            });
        }else{
            res.status(401).json({
                "message": "Cart Not Found 1"
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
//generate bill number 
exports.generate_bill_number = (req,res,next)=>{
    Carts.count()
        // .sort('-id')
        .exec()
        .then(cartData =>{
            console.log("cartData",cartData);
            var maxId = 1;
            Orders.count()
            // .sort('-id')
            .exec()
            .then(orderData =>{
                console.log("orderData",orderData);
                if(cartData > orderData) {
                   maxId = cartData + 1;
                }else if(orderData > cartData){
                    maxId = orderData + 1;
                }else if(orderData == cartData){
                    maxId = orderData + 1;
                }else{
                    maxId = 1;
                }
                res.status(200).json(maxId); 
                    
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

