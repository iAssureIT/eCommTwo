const mongoose = require('mongoose');

const FinishedGoodsEntrySchema = mongoose.Schema({
	_id			              : mongoose.Schema.Types.ObjectId,
    Date                      : String,
    itemId                    : String,/*itemID from productMaster*/
    productName               : String,
    PackageWeight             : String,
    Unit                      : String,
    Quantity                  : Number,
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
});

module.exports = mongoose.model('FinishedGoodsEntry' ,FinishedGoodsEntrySchema);