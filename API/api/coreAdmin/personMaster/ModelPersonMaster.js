const mongoose = require('mongoose');

const personMasterSchema = mongoose.Schema({
    _id                         : mongoose.Schema.Types.ObjectId,
    company_Id                  : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
    companyID                   : Number,
    companyName                 : String,
    type                        : String,
    CompanyID                   : String,
    firstName                   : String,
    middleName                  : String,
    lastName                    : String,
    DOB                         : Date,
    gender                      : String,
    contactNo                   : String,
    altContactNo                : String,
    profilePhoto                : String,
    email                       : String,
    whatsappNo                  : String,
    workLocation                : String,
    workLocationId              : String,
    badgeNumber                 : String,
    designationId               : { type: mongoose.Schema.Types.ObjectId, ref: 'designationmasters' },
    departmentId                : { type: mongoose.Schema.Types.ObjectId, ref: 'departmentmasters' },
    employeeId                  : String,
    bookingApprovalRequired     : String,
    loginCredential             : String,
    approvingAuthorityId1       : String,
    approvingAuthorityId2       : String,
    approvingAuthorityId3       : String,
    preApprovedParameter        : String,
    preApprovedParameterValue   : Number,
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
                                    licenseProof    : [{
                                                            imgUrl : String,
                                                            status : String,
                                                            remarks : String,
                                                            verifiedOn : Date,
                                                            verifiedBy : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
                                                        }]  
                                },
    identityProof               : [{
                                        imgUrl : String,
                                        status : String,
                                        remarks : String,
                                        verifiedOn : Date,
                                        verifiedBy : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
                                    }],                            
    aadhar                      :{
                                    aadharNo           : String,
                                    aadharProof        : [{
                                                            imgUrl : String,
                                                            status : String,
                                                            remarks : String,
                                                            verifiedOn : Date,
                                                            verifiedBy : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
                                                        }]
                                },
    verification                :{
                                    verificationNumber: String,
                                    verificationProof : Array
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
                            ],
    statusLog                   :   [
                                        {
                                            
                                            status 				: String,
                                            updatedAt           : Date,
                                            updatedBy           : String,
                                        }
                                    ]
});

module.exports = mongoose.model('personmasters',personMasterSchema);
