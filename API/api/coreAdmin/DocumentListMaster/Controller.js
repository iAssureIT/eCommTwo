const mongoose = require("mongoose");
const DocumentListMaster = require('./Model.js');
const DocumentEntityMaster = require('../DocumentEntityMaster/Model.js');

exports.insertDocumentListMaster = (req, res, next) => {
    DocumentListMaster
        .find({documententity:req.body.dropdownID,documentName:req.body.fieldValue})
        .then(data =>{
            if (data.length > 0) {
                res.status(409).json({ duplicated: true });
            } else {
                const documentListMaster = new DocumentListMaster({
                    _id: new mongoose.Types.ObjectId(),
                    documententityId: req.body.dropdownID,
                    documentName: req.body.fieldValue,
                    createdBy: req.body.createdBy,
                    createdAt: new Date()
                })
                documentListMaster.save()
                    .then(data => {
                        res.status(200).json({ created: true, fieldID: data._id });
                    })
                    .catch(err => {
                        res.status(500).json({ error: err });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

// exports.fetchDocumentList = (req, res, next) => {
//     DocumentListMaster.aggregate([
//         {
//             $lookup:
//             {
//                 from: "DocumentListMaster",
//                 localField: "documententityId",
//                 foreignField: "_id",
//                 as: "documententity"
//             }
//         },
//         { "$unwind": "$documententity" }, { $addFields: { documententity: "$documententity" } }])
//         .sort({ createdAt: -1 })
//         .skip(req.body.startRange)
//         .limit(req.body.limitRange)
//         .exec()
//         .then(data => {
//             var alldata = data.map((a, i) => {
//                 return {
//                     "_id": a._id,
//                     "documentName"      : a.documentName,
//                     "documententity"    : a.documententity,
//                     "documententityId"  : a.documententityId
//                 }
//             })
//             res.status(200).json(alldata);
//         })
//         .catch(err => {
//             res.status(500).json({ error: err });
//         });
// };

// exports.fetchDocumentList = (req, res, next) => {
// 	console.log("req.body=>",req.body);
// 	// .populate(documententityId)
// 	// DocumentListMaster.find({})
//     DocumentListMaster
//         .aggregate([
//                 {
//                     $lookup:
//                     {
//                         from: "Documententitymaster",
//                         localField: "documententityId",
//                         foreignField: "_id",
//                         as: "documentEntityDetails"
//                     }
//                 },
//                 // { "$unwind": "$documentEntityDetails" }, 
//                 // { $addFields: { documentEntityDetails: "$documentEntityDetails.documententity" } }
//         ])
//         .sort({ createdAt: -1 })
// 		.skip(req.body.startRange)
// 		.limit(req.body.limitRange)
// 		.exec()
// 		.then(data => {
//             console.log("data ==>",data);
//             res.status(200).json(data);
// 			// var alldata = data.map((a, i) => 
//             //         new Promise((resolve,reject) => {
//             //             try{
//             //                     console.log("All A=>",a);
//             //                     DocumentEntityMaster
//             //                         .findOne({_id:a.documententityId},{documententity:1})
//             //                         .then(dentity => {

//             //                             console.log("dentity=>",dentity);
//             //                             resolve({
//             //                                 "_id" 							: a._id,
//             //                                 "documentName" 			: a.documentName,
//             //                                 "documententity" 		: dentity.documententity,
//             //                                 "documententityId" 	: a.documententityId
//             //                             })
                                    
//             //                         })
//             //                     }catch(err){
//             //                         console.log("Promise catch error = ", err);
//             //                         resolve(null)
//             //                     }
//             //             }) //new promise
//             //     );//map function

//             //     Promise.all(alldata).then(docListArray => {
//             //         res.status(200).json(alldata);
//             //     })
// 	})
// 	.catch(err => {
// 		res.status(500).json({ error: err });
// 	});
// };

exports.fetchDocumentList = (req, res, next)=>{
    DocumentListMaster.aggregate([
        {
        $lookup:
            {
            from: "documententitymasters",
            localField: "documententityId",
            foreignField: "_id",
            as: "documentEntityDetails"
            }
        },
        { "$unwind": "$documentEntityDetails" },
        {$addFields: { documententity : "$documentEntityDetails.documententity"}}
    ])
    // { "$unwind": "$documentEntityDetails" },
        // {$addFields: { documententity : "$documentEntityDetails.documententity"}}
        .sort({createdAt : -1})
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data=>{
            console.log("data =>",data);
            var alldata = data.map((a, i)=>{
                    console.log("a =>",a);
                    return {
                        "_id"                : a._id,
                        "documententity"     : a.documententity,
                        "documentName"       : a.documentName,
                        "documententityId"   : a.documententityId  
                    }
            })
            res.status(200).json(alldata);
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        }); 
};


exports.getDocumentList = (req, res, next) => {
    DocumentListMaster.find({})
        .sort({ createdAt: -1 })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};
exports.fetchSingleDocumentList = (req, res, next) => {
    DocumentListMaster.findOne({ _id: req.params.fieldID })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.updateDocumentList = (req, res, next) => {
    DocumentListMaster.updateOne(
        { _id: req.body.fieldID },
        {
            $set: {
                'documentId': req.body.dropdownID,
                'model': req.body.fieldValue
            }
        }
    )
        .exec()
        .then(data => {
            if (data.nModified == 1) {
                DocumentListMaster.updateOne(
                    { _id: req.body.fieldID },
                    {
                        $push: {
                            'updateLog': [{
                                updatedAt: new Date(),
                                updatedBy: req.body.updatedBy
                            }]
                        }
                    })
                    .exec()
                    .then(data => {
                        res.status(200).json({ updated: true });
                    })
            } else {
                res.status(200).json({ updated: false });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
exports.deleteDocumentList = (req, res, next) => {
    DocumentListMaster.deleteOne({ _id: req.params.fieldID })
        .exec()
        .then(data => {
            if (data.deletedCount === 1) {
                res.status(200).json({ deleted: true });
            } else {
                res.status(200).json({ deleted: false });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};
