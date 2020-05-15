const mongoose = require('mongoose');

const entitySchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    supplierOf                : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymaster' },
    entityType                : String,
    companyID                 : Number, 
    companyName               : String,
    groupName                 : String,
    CIN                       : String,   
    COI                       : Array,
    TAN                       : String,
    companyLogo               : Array,
    website                   : String,
    companyPhone              : String,
    companyEmail              : String,  
    profileStatus             : String,
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
                                    branchName          : String,
                                    firstName           : String,
						            lastName            : String,
                                    phone               : String,
                                    altPhone            : String,
                                    email               : String,
                                    department          : String,
                                    designation         : String,
                                    departmentName      : String,
                                    designationName     : String,
                                    employeeID          : String,
                                    userID              : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
                                    personID            : { type: mongoose.Schema.Types.ObjectId, ref: 'personmasters' },
                                    bookingApprovalRequired   : String,
                                    approvingAuthorityId1      : String,
                                    approvingAuthorityId2      : String,
                                    approvingAuthorityId3      : String,
                                    preApprovedParameter       : String,
                                    preApprovedParameterValue  : String,
                                    createUser                : Boolean,
                                    addEmployee               : Boolean,
                                    role                      : String
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