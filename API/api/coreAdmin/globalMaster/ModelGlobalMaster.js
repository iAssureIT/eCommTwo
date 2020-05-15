const mongoose = require('mongoose');

const globalmasterSchema = mongoose.Schema({
    _id             : mongoose.Schema.Types.ObjectId,
    type            : String,
    taxType         : String,
    taxRating       : String,
    effectiveFrom   : Date,
    effectiveTo     : Date,
    status          : String,
    authID          : String,
    authToken       : String,
    sourceMobile    : String,
    createdAt       : Date,
                                                 
}); 

module.exports = mongoose.model('globalmaster',globalmasterSchema);
