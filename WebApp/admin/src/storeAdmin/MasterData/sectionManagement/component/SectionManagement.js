import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import ReactTable           from "react-table";
import swal                 from 'sweetalert';
import S3FileUpload         from 'react-s3';
import IAssureTable         from '../../../../coreadmin/IAssureTable/IAssureTable.jsx';
import 'jquery-validation';
import 'bootstrap/js/tab.js';
import '../css/SectionManagement.css';


class SectionManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "addEditMode": "",

      "tableHeading": {
        section: "Section",
        section: "Section Title",
        sectionRank: "Section Rank",
        // sectionImage: "Section Images",
        actions: 'Action',
      },
      "tableObjects": {
        deleteMethod: 'delete',
        apiLink: '/api/sections',
        paginationApply: true,
        searchApply: false,
        editUrl: '/project-master-data'
      },
      "startRange": 0,
      "limitRange": 10,
      "editId": this.props.editId ? this.props.editId : ''
    };
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    var editId = nextProps.editId;
    if (editId) {
      this.setState({
        editId: editId
      })
      this.edit(editId);
    }
  }

  componentDidMount() {
    this.setState({
      editId : this.props.editId,
    },()=>{
      console.log("this.state.editId = ",this.state.editId);
    })

    window.scrollTo(0, 0);
    if (this.props.editId) {
      this.edit(this.props.editId);
    }
    
    $.validator.addMethod("regxA1", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid section title");

    $.validator.setDefaults({
      debug: true,
      success: "valid"
    });

    $("#sectionManagement").validate({
      rules: {
        
        section: {
          required: true,
          regxA1: /^[a-zA-Z0-9@&()_+-\s]*$/i,
        },
        sectionRank: {
          required: true,
        },
        // /^[^-\s][a-zA-Z0-9_\s-]+$/
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "section") {
          error.insertAfter("#section");
        }

        if (element.attr("name") === "sectionRank") {
          error.insertAfter("#sectionRank");
        }
      }
    });
    this.getDataCount();
    this.getData(this.state.startRange, this.state.limitRange);
  }

  getDataCount() {
    axios.get('/api/sections/get/count')
      .then((response) => {
        // console.log('dataCount', response.data);
        this.setState({
          dataCount: response.data.dataCount
        })
      })
      .catch((error) => {
        console.log('error', error);
      });

  }
  getData(startRange, limitRange) {
    axios.get('/api/sections/get/list-with-limits/' + startRange + '/' + limitRange)
      .then((response) => {
        console.log('SEction tableData ==> ', response.data);
        this.setState({
          tableData: response.data
        })
      })
      .catch((error) => {
        console.log('error', error);
      });
    }
    
    // submitsection(event){
    //   event.preventDefault();
    //   if($('#sectionManagement').valid()){
    //     var formValues = {
    //         "section"                  : this.state.section,
    //         "createdBy"                : localStorage.getItem("admin_ID")
    //     }
    //     axios.post('/api/sections/post', formValues)
    //       .then((response)=>{
    //         swal({
    //           text  : response.data.message,
    //           title : response.data.message,
    //         });
    //         this.setState({
    //           "section"                      : 'Select',
    //           "sectionUrl"                   : '',
    //           "addEditModeSubsection"        : '',
    //         });
    //         this.getData(this.state.startRange, this.state.limitRange);
    //       })
    //       .catch((error)=>{
    //         console.log('error', error);
    //       });
    //   }
    // }

  submitsection(event) {
    event.preventDefault();
    if ($('#sectionManagement').valid()) {
      var formValues = {
        "section"     : this.state.section,
        "sectionRank" : this.state.sectionRank,
        "createdBy"   : localStorage.getItem("admin_ID")
      }
      axios.post('/api/sections/post', formValues)
        .then((response) => {
          swal({
            text: response.data.message,
          });
          this.setState({
            "section": '',
            "sectionUrl": '',
            "addEditModeSubsection": '',
            "sectionRank" : '',
          });
          this.getData(this.state.startRange, this.state.limitRange);
        })
        .catch((error) => {
          console.log('error', error);
        });

    }
  }
  updatesection(event) {
    event.preventDefault();
    if ($('#sectionManagement').valid()) {
      var formValues = {
        "sectionID"   : this.state.editId,
        "section"     : this.state.section,
        "sectionRank" : this.state.sectionRank,
        "sectionImage": this.state.sectionImage,
      }
      // console.log('form', formValues);
      axios.patch('/api/sections/patch', formValues)
        .then((response) => {
          swal({
            text: response.data.message,
          });
          this.getData(this.state.startRange, this.state.limitRange);
          this.setState({
            "section": '',
            "sectionUrl": '',
            "editId" : '',
            "sectionRank": '',
            "sectionImage": '',
          });
          
          window.location.href ='/project-master-data';
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }
  edit(id) {
    axios.get('/api/sections/get/one/' + id)
      .then((response) => {
        console.log('edit = ', response.data);
        if (response.data) {
          this.setState({
            "section"     : response.data.section,
            "sectionRank" : response.data.sectionRank,
            "sectionUrl"  : response.data.sectionUrl,
            "sectionImage"  : response.data.sectionImage
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  uploadImage(event){
    event.preventDefault();
    var sectionImage = "";
    if (event.currentTarget.files && event.currentTarget.files[0]) {
        // for(var i=0; i<event.currentTarget.files.length; i++){
            var file = event.currentTarget.files[0];
            if (file) {
                var fileName  = file.name; 
                var ext = fileName.split('.').pop();  
                if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){
                    if (file) {
                        var objTitle = { fileInfo :file }
                        sectionImage = objTitle ;
                        
                    }else{          
                        swal("Images not uploaded");  
                    }//file
                }else{ 
                    swal("Allowed images formats are (jpg,png,jpeg)");   
                }//file types
            }//file
        // }//for 

        if(event.currentTarget.files){
            this.setState({
              sectionImage : sectionImage
            });  
            main().then(formValues=>{
                this.setState({
                  sectionImage : formValues.sectionImage
                })
            });
            async function main(){
                var config = await getConfig();
                // console.log("line 429 config = ",config);
                var s3url = await s3upload(sectionImage.fileInfo, config, this);

                const formValues = {
                  "sectionImage"    : s3url,
                  "status"           : "New"
                };
  
                return Promise.resolve(formValues);
            }
            function s3upload(image,configuration){
    
                return new Promise(function(resolve,reject){
                    S3FileUpload
                        .uploadFile(image,configuration)
                        .then((Data)=>{
                            resolve(Data.location);
                        })
                        .catch((error)=>{
                            console.log(error);
                        })
                })
            }   
            function getConfig(){
                return new Promise(function(resolve,reject){
                    axios
                        // .get('/api/projectSettings/get/one/s3')
                        .get('/api/projectSettings/get/S3')
                        .then((response)=>{
                          // console.log("s3 response :",response.data);
                            const config = {
                                bucketName      : response.data.bucket,
                                dirName         : process.env.ENVIRONMENT,
                                region          : response.data.region,
                                accessKeyId     : response.data.key,
                                secretAccessKey : response.data.secret,
                            }
                            resolve(config);                           
                        })
                        .catch(function(error){
                            console.log(error);
                        })
    
                })
            }        
        }
    }
  }
  deleteImage(event){
      // console.log('delete');
      
      var id = event.target.id;
      var productImageArray = this.state.productImageArray;
      // console.log('productImage', productImageArray, id);

      productImageArray.splice(productImageArray.findIndex(v => v === id), 1);
      this.setState({
          sectionImage : "",
          productImageArray: productImageArray
      },()=>{
          // console.log('subcatgArr', this.state.subcatgArr);
      });
  }
  createsectionUrl(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
    var url = event.target.value;
    console.log('url',url);
    if (url) {
      url = url.replace(/\s+/g, '-').toLowerCase();
      // $(".productUrl").val(url);
      this.setState({
        sectionUrl: url
      })
    }else{
      this.setState({
        sectionUrl: ''
      })
    }
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                  <div className="">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                      <h4 className="NOpadding-right">Section Master </h4>
                    </div>
                      <div className="col-lg-12 col-md-12 marginTopp NOpadding">
                      <form id="sectionManagement" className="">
                          <div className="col-lg-5 fieldWrapper">
                            <div className="col-lg-12">
                              <label>Section Title <i className="redFont">*</i></label>
                              <input value={this.state.section} name="section" id="section" onChange={this.createsectionUrl.bind(this)} type="text" className="form-control edit-catg-new" placeholder="Section Title" ref="section" />
                            </div>
                          </div>
                          <div className="col-lg-5 fieldWrapper">
                            <div className="col-lg-12">
                              <label>Section URL <i className="redFont">*</i></label>
                              <input disabled value={this.state.sectionUrl} onChange={this.handleChange.bind(this)} id="sectionUrl" name="sectionUrl" type="text" className="form-control sectionUrl" placeholder="Section URL" ref="sectionUrl" />
                            </div>                            
                          </div>
                          <div className="col-lg-12 fieldWrapper">
                            <div className="col-lg-10">
                                  <label>Section Rank <i className="redFont">*</i></label>                                                                    
                                  <input value={this.state.sectionRank} onChange={this.handleChange.bind(this)} id="sectionRank" name="sectionRank" type="number" className="form-control sectionRank" placeholder="Section Rank" ref="sectionRank" min="1"  required/>
                            </div>
                          </div>
                          <div className="col-lg-10 fieldWrapper">
                          <div className="col-lg-10">
                            <label>Section Image</label>                                                                              
                                      {
                                        this.state.sectionImage ?
                                        null
                                        :
                                        
                                        <div className="divideCatgRows categoryImgWrapper">
                                            <label>Category Image</label>                                                                    
                                            <input type="file" onChange={this.uploadImage.bind(this)} title="Click to Edit Photo" className="" accept=".jpg,.jpeg,.png" />
                                        </div>
                                      }
                                      {
                                        this.state.sectionImage ? 
                                        <div className="row">
                                          <div className="col-lg-4 productImgCol">
                                            <div className="prodImage">
                                              <div className="prodImageInner">
                                                  <span className="prodImageCross" title="Delete" data-imageUrl={this.state.sectionImage} onClick={this.deleteImage.bind(this)} >x</span>
                                              </div>
                                              <img title="view Image" alt="Please wait..." src={this.state.sectionImage ? this.state.sectionImage : "/images/notavailable.jpg"} className="img-responsive" />
                                            </div>    
                                          </div>
                                        </div>
                                        :
                                        null
                                      }
                              </div>
                          </div>
                        
                          <div className="col-lg-12">
                            <div className="col-lg-4 btnWrapper pull-right">
                            <label>&nbsp;</label>
                              {
                                this.state.editId ?
                                  <button onClick={this.updatesection.bind(this)} className="col-lg-12 btn-primary btn ">Update</button>
                                  :
                                  <button onClick={this.submitsection.bind(this)} className=" col-lg-12 btn-primary btn ">Submit</button>
                              }
                              </div>
                          </div>
                        
                      </form>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <IAssureTable
                          tableHeading={this.state.tableHeading}
                          twoLevelHeader={this.state.twoLevelHeader}
                          dataCount={this.state.dataCount}
                          tableData={this.state.tableData}
                          getData={this.getData.bind(this)}
                          tableObjects={this.state.tableObjects}
                        />
                      </div>
                    </div>
                </div>
              </div>
            </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SectionManagement;