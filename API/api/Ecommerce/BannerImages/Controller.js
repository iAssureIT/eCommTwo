const mongoose	= require("mongoose");

const BannerImage = require('./Model');

exports.insert_image = (req,res,next)=>{
	
                const BannerImage = new BannerImage({
                    _id                       : new mongoose.Types.ObjectId(),                    
                    bannerimages              : req.body.bannerimages,                    
                    createdAt                 : new Date()
                });
                console.log("BannerImage:",BannerImage);
                BannerImage.save()
                .then(data=>{
                    res.status(200).json({
                        "message": "Image Submitted Successfully."
                    });
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
};

exports.fetch_bannerimgs = (req,res,next)=>{
    BannerImage.find({})
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
};
exports.delete_image = (req,res,next)=>{
    BannerImage.deleteOne({_id:req.params.imageId})
    .exec()
    .then(data=>{
        console.log("data===",data);
        res.status(200).json({ 
            "message": "image Deleted Successfully."
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

