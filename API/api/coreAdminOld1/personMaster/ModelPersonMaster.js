const mongoose = require('mongoose');

const personMasterSchema = mongoose.Schema({
    _id                         : mongoose.Schema.Types.ObjectId,
    type                        : String,
    firstName                   : String,
    middleName                  : String,
    lastName                    : String,
    DOB                         : Date,
    gender                      : String,
    contactNo                   : String,
    altContactNo                : String,
    profilePhoto                : Array,
    email                       : String,
    whatsappNo                  : String,
    workLocation                : String,
    designationId               : { type: mongoose.Schema.Types.ObjectId, ref: 'designationmasters' },
    departmentId                : { type: mongoose.Schema.Types.ObjectId, ref: 'departmentmasters' },
    employeeId                  : String,
    bookingApprovalRequired     : String,
    approvingAuthorityId        : String,
    preApprovedAmount           : Number,
    address                     : [{
                                    addressLine1    : String,
                                    addressLine2    : String,
                                    landmark        : String,
                                    area            : String,
                                    city            : String,
                                    district        : String,
                                    stateCode       : String,
                                    state           : String,
                                    countryCode     : String,
                                    country         : String,
                                    pincode         : Number,
                                    latitude        : String,
                                    longitude       : String,
                                    addressProof    : Array
                                }],

    drivingLicense              :{
                                    licenseNo       : String,
                                    effectiveTo     : Date,
                                    licenseProof    : Array
                                },
    identityProof               : Array,                            
    // pan                      : [{
    //                                 PAN             : String,
    //                                 PANProof        : Array
    //                             }],
    aadhar                      :{
                                    aadharNo           : String,
                                    aadharProof        : Array
                                },
    backgroundVerification      :{
                                    verficationNumber  : String,
                                    verficationProof   : Array
                                },
    // voterID                     : [{
    //                                 voterID             : String,
    //                                 voterIDProof        : Array
    //                             }],
    // passport                    : [{
    //                                 passportNo           : String,
    //                                 passportProof        : Array
    //                             }], 
    corporateId                 : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },                              
    userId                      : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    status                      : String,
    fileName                    : String,
    createdBy                   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                   : Date,
    updateLog                   : [
                                {
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }
                                ]
});

module.exports = mongoose.model('personmasters',personMasterSchema);
