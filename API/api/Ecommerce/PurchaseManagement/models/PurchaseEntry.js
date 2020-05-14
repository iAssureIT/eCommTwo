const mongoose = require('mongoose');

const PurchaseEntrySchema = mongoose.Schema({
	_id			              : mongoose.Schema.Types.ObjectId,
    purchaseDate              : String,
    purchaseStaff             : String,
    purchaseLocation          : String,
    productId                 : String,/*_id from productMaster*/
    itemId                    : String,/*itemID from productMaster*/
    productName               : String,
    quantity                  : Number,
    unit                      : String,
    amount                    : Number,
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
});

module.exports = mongoose.model('PurchaseEntry' ,PurchaseEntrySchema);