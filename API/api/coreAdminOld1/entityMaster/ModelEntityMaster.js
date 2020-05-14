const mongoose = require('mongoose');

const entitySchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    supplierOf                    : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymaster' },
    entityType                : String,
    entityCode                : Number, 
    companyName               : String,
    groupName                 : String,
    CIN                       : String,   
    COI                       : Array,
    TAN                       : String,
    companyLogo               : Array,
    website                   : String,
    companyPhone              : String,
    companyEmail              : String,  
    locations           :       [
                                {
                                    locationType        : String,
                                    branchCode          : Number,
                                    addressLine1        : String,
                                    addressLine2        : String,
                                    countryCode         : String,
                                    country             : String,
                                    stateCode           : String,
                                    state               : String,
                                    district            : String,
                                    city                : String,
                                    area                : String,
                                    pincode             : Number,
                                    GSTIN               : String,
                                    GSTDocument         : Array,
                                    PAN                 : String,
                                    PANDocument         : Array
                                }
                                ],
    contactPersons      :       [
                                {
                                    branchCode          : Number,
                                    firstName           : String,
						            lastName            : String,
                                    phone               : String,
                                    altPhone            : String,
                                    email               : String,
                                    department          : String,
                                    designation         : String,
                                    employeeID          : String,
                                    userID              : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
                                    personID            : { type: mongoose.Schema.Types.ObjectId, ref: 'personmasters' },
                                    bookingApprovalRequired   : Boolean,
                                    approvingAuthorityId      : String,
                                    preApprovedAmount         : Number,
                                    createUser                : Boolean,
                                    addEmployee               : Boolean
                                }
                                ],
    
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
    updateLog                 : [
                                {
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }
                                ]
});

module.exports = mongoose.model('entitymasters',entitySchema);