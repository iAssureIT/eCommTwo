const mongoose = require('mongoose');

const FinishedGoodsEntrySchema = mongoose.Schema({
	_id			              : mongoose.Schema.Types.ObjectId,
    Date                      : String,
    ItemCode                  : String,/*itemID from productMaster*/
    ProductCode               : String,
    productName               : String,
    CurrentStock              : Number,
    OutwardStock              : Number,
    OutwardUnit               : String,
    Weight                    : Number,
    WeightPerUnit             : String,
    Quantity                  : Number,
    InwardStock               : Number,
    InwardUnit                : String,
    Scrap                     : Number,
    ScrapUnit                 : String,
    PaidBy                    : String,
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
});

module.exports = mongoose.model('FinishedGoodsEntry' ,FinishedGoodsEntrySchema);
