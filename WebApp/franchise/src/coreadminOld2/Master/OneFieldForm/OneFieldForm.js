import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import IAssureTable         from '../../IAssureTable/IAssureTable.jsx';
import axios                from 'axios';
import swal                 from 'sweetalert';
import { withRouter }       from 'react-router-dom';
import _                    from 'underscore';
import S3FileUpload         from 'react-s3';
import 'bootstrap/js/tab.js';
import './OneField.css'
var apiLink = "";
class OneFieldForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "user_ID"   : "",
            "startRange": 0,
            "limitRange": 10,
            "editId"    :  '',
            "fieldValue" : "",
            "profilePhoto" :"",
        };
    }
    componentDidMount() {
        apiLink =  this.props.tableObjects.apiLink;
        const user_ID = localStorage.getItem("user_ID")
        this.setState({
            user_ID : user_ID,
        })
        this.getData(this.state.startRange, this.state.limitRange);
         jQuery.validator.setDefaults({
          debug: true,
          success: "valid"
        });
        $("#vendorLocationType").validate({
          rules: {
            OneFieldInput: {
              required: true
            },
          },
          errorPlacement: function (error, element) {
            if (element.attr("name") === "OneFieldInput") {
              error.insertAfter("#OneFieldInput");
            }
          }
        });
    }
   
    componentWillReceiveProps(nextProps) {
        
        if(nextProps.editId){
            this.edit(nextProps.editId);
        }else{
            this.setState({
                fieldName: "",
                iconUrl  : "",
                editId: ""
            })
        }
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var fieldName = this.props.fields.attributeName
        this.setState({
            fieldName : event.target.value
        });

    }
    submitType(event) {
        event.preventDefault();
        if(this.props.editId)
        {
            var formValues ={
                "fieldID"       : this.props.editId,
                "fieldValue"    : this.state.fieldName,
                "iconUrl"       : this.state.profilePhoto,
                "updatedBy"     : this.state.user_ID
            }
        if ($('#vendorLocationType').valid()) {
            axios.patch(apiLink+'/patch', formValues)
                .then((response) => {
                    this.setState({
                        fieldName    : "",
                        profilePhoto :"",
                        editId       : ""
                    },()=>{
                        this.props.history.push(this.props.tableObjects.editUrl);
                    })
                    this.getData(this.state.startRange, this.state.limitRange);
                    swal(this.props.fields.title+" updated sucessfully");
                })
                .catch((error) => {
                })
        }
        }else
        {
            var formValues = {
                "fieldValue"    : this.state.fieldName,
                "iconUrl"       : this.state.profilePhoto,
                "createdBy"     : this.state.user_ID
            }
            console.log("formValues",formValues,this.state.profilePhoto);
        if ($('#vendorLocationType').valid()) {
            console.log("apiLink",apiLink);
            axios.post(apiLink+'post', formValues)
                .then((response) => {
                    console.log(response.data)
                    if (response.data.created) {
                        swal(this.state.fieldName+" "+this.props.fields.title+" submitted sucessfully");
                    }else{
                        swal(this.state.fieldName+" "+this.props.fields.title+" already exists");
                    }
                    this.getData(this.state.startRange, this.state.limitRange);
                    this.setState({
                       fieldName    : "",
                       profilePhoto : "",
                       iconUrl      : ""
                     })
                })
                .catch((error) => {
                    
                })
        }

        }
      
    }
    updateType(event) {
        event.preventDefault();
         var formValues ={
                "fieldID"       : this.props.editId,
                "fieldValue"    : this.state.fieldName,
                "iconUrl"       : this.state.profilePhoto,
                "updatedBy"     : this.state.user_ID
            }
        if ($('#vendorLocationType').valid()) {
            axios.patch(apiLink+'/patch', formValues)
                .then((response) => {
                    this.setState({
                        fieldName    : "",
                        profilePhoto :"",
                        editId       : ""
                    },()=>{
                        this.props.history.push(this.props.tableObjects.editUrl);
                    })
                    this.getData(this.state.startRange, this.state.limitRange);
                    swal(this.props.fields.title+" updated sucessfully");
                })
                .catch((error) => {
                })
            }
            
    }
    getDataCount() {
        axios.get('/api/vendorLocationType/get/count')
            .then((response) => {
               
                this.setState({
                    dataCount: response.data.dataCount
                })

            })
            .catch((error) => {
                
            });
    }
    getData(startRange, limitRange) {
        var data = {
            startRange: startRange,
            limitRange: limitRange
        }
        axios.post(apiLink+'/get/list', data)
            .then((response) => {
                console.log(" response.data", response.data);
                var tableData = response.data.map((a, i)=>{
                    return({
                        _id                                 : a._id,
                        [this.props.fields.attributeName]   : a[this.props.fields.attributeName],
                        iconUrl                             : "<img class='uploadedImage' src="+a.iconUrl+">"
                    })
                })
                this.setState({
                    tableData: tableData
                })
                console.log("tableData",this.state.tableData);

            })
            .catch((error) => {
                
            });
    }
    edit(id) {
        $('label.error').html('')
        var fieldName = this.props.fields.attributeName;
        axios.get(apiLink+'get/one/' + id)
            .then((response) => {
                console.log("response",response);
                if (response.data) {
                    this.setState({
                        "fieldName": response.data[fieldName],
                        "profilePhoto": response.data.iconUrl,
                    });
                }
            })
            .catch((error) => {
                
            });
    }
    docBrowse(event) {
        event.preventDefault();
        var name = event.target.name
        var docBrowse = [];
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for (var i = 0; i < event.currentTarget.files.length; i++) {
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName = file.name;
                    var ext = fileName.split('.').pop();
                    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "pdf" || ext === "JPG" || ext === "PNG" || ext === "JPEG" || ext === "PDF") {
                        if (file) {
                            var objTitle = { fileInfo: file }
                            docBrowse.push(objTitle);
                          console.log("docBrowse",docBrowse)

                        } else {
                            swal("Files not uploaded");
                        }//file
                    } else {
                        swal("Allowed images formats are (jpg,png,jpeg, pdf)");
                    }//file types
                }//file
            }//for 

            if (event.currentTarget.files) {
                main().then(formValues => {
                    console.log("formValues",formValues);
                    var docBrowse = this.state[name];
                    this.setState({
                        [name]: formValues[0].docBrowse
                    },()=>{
                        console.log("profilePhoto0",this.state.profilePhoto)
                    })
                });

                async function main() {
                    var formValues = [];
                    for (var j = 0; j < docBrowse.length; j++) {
                        var config = await getConfig();
                        var s3url = await s3upload(docBrowse[j].fileInfo, config, this);
                        const formValue = {
                            "docBrowse": s3url,
                            "status": "New"
                        };
                        formValues.push(formValue);
                    }
                    return Promise.resolve(formValues);
                }


                function s3upload(image, configuration) {

                    return new Promise(function (resolve, reject) {
                        S3FileUpload
                            .uploadFile(image, configuration)
                            .then((Data) => {
                                resolve(Data.location);
                            })
                            .catch((error) => {
                            })
                    })
                }
                function getConfig() {
                  return new Promise(function (resolve, reject) {
                      axios
                        .get('/api/projectsettings/get/S3')
                        .then((response) => {
                            const config = {
                                bucketName: response.data.bucket,
                                dirName: 'propertiesImages',
                                region: response.data.region,
                                accessKeyId: response.data.key,
                                secretAccessKey: response.data.secret,
                            }
                            resolve(config);
                        })
                        .catch(function (error) {
                        })
                    })
                }
            }
        }
    }
    deleteDoc(event){
    event.preventDefault();
        var name = event.target.getAttribute("name");
      
        this.setState({
            [name]: ""
        })
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">{this.props.fields.title === "Fuel Type" || this.props.fields.title === "Vehicle Category" ||this.props.fields.title === "Package Type"? this.props.fields.title : this.props.fields.title } </h4>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                                        {
                                            this.props.fields.hasImage === true ?
                                            <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="vendorLocationType" >
                                                    <div className="form-margin col-lg-6 col-lg-offset-1 col-md-6 col-sm-12 col-xs-12 pdcls">
                                                        <div id="OneFieldInput">
                                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">{this.props.fields.title} <i className="astrick">*</i></label>
                                                            <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.fieldName} ref={this.props.fields.attributeName} name="fieldName" onChange={this.handleChange.bind(this)} placeholder={this.props.fields.placeholder} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OFFImageDiv" id="LogoImageUpOne">
                                                            <div><i className="fa fa-camera"></i> <br /><p>UPLOAD IMAGE</p></div>
                                                            <input onChange={this.docBrowse.bind(this)}  id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="profilePhoto" />
                                                        </div>
                                                        {
                                                          this.state.profilePhoto ?
                                                            <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 nopadding CustomImageUploadOF">
                                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                                      <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={this.state.profilePhoto} name="profilePhoto" onClick={this.deleteDoc.bind(this)}>x</label>
                                                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosOF" id="profilePhoto">
                                                                          <img src={this.state.profilePhoto} className="img-responsive profileImageDivlogoStyleOF" />
                                                                      </div>
                                                                  </div>
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                    </div>
                                                    <div className="form-margin col-lg-6 col-lg-offset-6 col-md-6 col-sm-12 col-xs-12">
                                                        {
                                                            this.props.editId ?
                                                            <button onClick={this.updateType.bind(this)} className="btn button3 pull-right">Update</button>
                                                            :
                                                            <button onClick={this.submitType.bind(this)} className="btn button3 pull-right">Submit</button>
                                                        }
                                                    </div>
                                                    <br />
                                                </form>
                                            :
                                            <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="vendorLocationType" onSubmit={this.submitType.bind(this)} >
                                                <div className="form-margin col-lg-8 col-lg-offset-2 col-md-6 col-sm-12 col-xs-12 pdcls">
                                                   <div id="OneFieldInput">
                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">{this.props.fields.title} <i className="astrick">*</i></label>
                                                        <input type20="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.fieldName} ref={this.props.fields.attributeName} name="fieldName" onChange={this.handleChange.bind(this)} placeholder={this.props.fields.placeholder} />
                                                    </div>
                                                </div>
                                                <br />
                                            </form>
                                        }
                                           
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <IAssureTable
                                                tableHeading={this.props.tableHeading}
                                                twoLevelHeader={this.state.twoLevelHeader}
                                                dataCount={this.state.dataCount}
                                                tableData={this.state.tableData}
                                                getData={this.getData.bind(this)}
                                                tableObjects={this.props.tableObjects}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        );
    }
}
export default withRouter(OneFieldForm)


