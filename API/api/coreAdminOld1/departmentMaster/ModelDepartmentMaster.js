const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    department                : String,
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
    updateLog                 : [
                                {
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }
                                ]
});

module.exports = mongoose.model('departmentmasters',departmentSchema);