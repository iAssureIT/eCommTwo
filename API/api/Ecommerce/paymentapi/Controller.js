const mongoose	= require("mongoose");

const Payments = require('./Model');

exports.insert = (req,res,next)=>{
        const payments = new Payments({
            _id                       : new mongoose.Types.ObjectId(),                    
            RESPOSE_CODE              : req.body.RESPOSE_CODE,
            RESPOSE_MESSAGE           : req.body.RESPOSE_MESSAGE,
            REFERENCE_NO              : req.body.REFERENCE_NO,
            status                    : req.body.status,                 
            createdAt                 : new Date()
        });
        console.log("payments:",payments);
        payments.save()
        .then(data=>{
            res.status(200).json({
                "message": "Payment Submitted Successfully."
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
