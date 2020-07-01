const mongoose = require('mongoose');

const FranchiseGoodsSchema = mongoose.Schema({
	_id			              : mongoose.Schema.Types.ObjectId,
    franchiseDeliveryId       : String,
    franchise_id              : String,
    franchisePO_id            : String,
    deliveryChallanNum        : String,
    productCode               : String,
    itemCode                  : String,
    productName               : String,
    inwardQty                 : String,
    unit                      : String,
    orders                    : Array,
    productCode               : String,
    balance                   : Number,
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
});

module.exports = mongoose.model('FranchiseGoods' ,FranchiseGoodsSchema);
