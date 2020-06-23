const mongoose = require('mongoose');

const FranchiseGoodsSchema = mongoose.Schema({
	_id			              : mongoose.Schema.Types.ObjectId,
    distributionDate          : Date,
    deliveryChallanNo         : String,
    franchiseId               : String,
    purchaseOrderId           : String,
    totalDemand               : String,
    totalSupply               : String,
    orderItems                : Array,/*_id from productMaster*/
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
});

module.exports = mongoose.model('FranchiseGoods' ,FranchiseGoodsSchema);
