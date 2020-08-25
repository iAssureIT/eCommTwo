const mongoose  = require("mongoose");
const Discounts = require('./Model');
var moment              = require('moment');
exports.insert_section = (req,res,next)=>{
        	const DiscountObj = new Discounts({
                        _id                       : new mongoose.Types.ObjectId(),                    
                        discounttype              : req.body.discounttype,
                        discountin                : req.body.discountin,
                        discountvalue             : req.body.discountvalue,
                        startdate                 : moment(req.body.startdate).format("YYYY-MM-DD"),
                        enddate                   : moment(req.body.enddate).format("YYYY-MM-DD"),
                        createdBy 				  : req.body.createdBy, 	
                        createdAt                 : new Date()
                    });
                    console.log("DiscountObj===>",DiscountObj);
                    DiscountObj
                    .save()
                    .then(data=>{
                        res.status(200).json({
                    		"message": "Discount is submitted successfully."
                		});
                    })
                    .catch(err =>{
                    	res.status(500).json({
		                    error: err
		                });
                    });
};        

exports.get_sections = (req,res,next)=>{
    Discounts.find()       
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

exports.get_single_section = (req,res,next)=>{
    Discounts.findOne({_id : req.params.sectionID})       
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

exports.update_section = (req,res,next)=>{
    console.log("Update Body = ", req.body);
    Discounts.updateOne(
            { _id:req.body.discountID},  
            {
                $set:{
                    discounttype              : req.body.discounttype,
                    discountin                : req.body.discountin,
                    discountvalue             : req.body.discountvalue,
                    startdate                 : req.body.startdate,
                    enddate                   : req.body.enddate,
                }
            }
        )
        .exec()
        .then(data=>{
                res.status(200).json({
                    "message": "Discount Updated Successfully."
                });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.delete_section = (req,res,next)=>{

    Discounts.deleteOne({_id:req.params.sectionID})
                        .exec()
                        .then(data=>{
                            res.status(200).json({
                                "message": "Section Deleted Successfully."
                            });
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
};
exports.count_section = (req,res,next)=>{
    Sections.find({})
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
};

exports.get_sections_with_limits = (req,res,next)=>{
    Discounts.find()  
        .skip(parseInt(req.params.startRange))
        .limit(parseInt(req.params.limitRange))     
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
