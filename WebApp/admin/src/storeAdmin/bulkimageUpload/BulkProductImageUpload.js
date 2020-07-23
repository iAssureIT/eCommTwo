import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import S3FileUpload           from 'react-s3';
class BulkProductImageUpload extends Component{
  constructor(props){
      super(props);
      this.state = {
        notuploadedImages : [],
        allshopproductimages : [],
        productImageArray : [],
        progressLength : 0
      }
  }

  componentDidMount() {
    this.getData();
  }
  getData(){
    axios.get('/api/products/get/list')
    .then((response)=>{
        console.log('/api/products/get/list response = ', response.data)
        this.setState({
          allshopproductimages : response.data
        })
    })
    .catch((error)=>{
        console.log('error', error);
    })
}


  componentWillReceiveProps(nextProps){
    this.setState({
      'allshopproductimages':nextProps.productData,
    });
  }
  
  bulkuplodaProductImages(event){
    event.preventDefault();
        var productImage = [];
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for(var i=0; i<event.currentTarget.files.length; i++){
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName  = file.name; 
                    var itemCode = file.name.split('-')[0];
                    var ext = fileName.split('.').pop();  
                    if(ext==="jpg" || ext==="png" || ext==="jpeg" || ext==="JPG" || ext==="PNG" || ext==="JPEG"){
                        if (file) {
                            var objTitle = { 
                              fileInfo :file,
                              itemCode : itemCode
                            }
                            productImage.push(objTitle);
                            
                        }else{          
                            swal("Images not uploaded");  
                        }//file
                    }else{ 
                        swal("Your "+fileName+" image has format of "+ext+". Allowed images formats are (jpg,png,jpeg)");
                    }//file types
                }//file
            }//for 

            if(i >= event.currentTarget.files.length){
                this.setState({
                    productImage : productImage
                });  
                
                const main = async ()=>{
                    var config = await getConfig();
                    console.log("config",config);
                    if(config){                    
                      var s3urlArray = [];
                      var imageLength = 100;
                      var z = 0;
                      for (var i = 0; i<productImage.length; i++) {
                        var s3url = await s3upload(productImage[i].fileInfo, config, this);
                        var x = i + 1;
                        var progressLength = (x/productImage.length) * 100;
                        this.setState({
                          progressLength : parseInt(progressLength)
                        })
                        s3urlArray.push({
                          productImage : s3url,
                          itemCode : productImage[i].itemCode
                        });
                      }
                      const formValues = {
                          "product_ID"        : "",
                          "productImage"      : s3urlArray,
                          "status"            : "New"
                      };
                      return Promise.resolve(formValues);
                  }
                }
                main().then(formValues=>{
                  var newImages = this.state.productImageArray;
                  newImages.push(formValues.productImage);
                  this.setState({
                      productImageArray : _.flatten(newImages)
                  })
              });

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
                           .get('/api/projectSettings/get/S3')
                           .then((response)=>{
                                if(response.data){
                                  const config = {
                                    bucketName      : response.data.bucket,
                                    dirName         : process.env.ENVIRONMENT,
                                    region          : response.data.region,
                                    accessKeyId     : response.data.key,
                                    secretAccessKey : response.data.secret,
                                  }
                                  resolve(config);                               
                                }
                                
                                                           
                            })
                           .catch(function(error){
                                console.log(error);
                           })
        
                    })
                }        
            }
        }
    
  }
  saveImages(event){
    event.preventDefault();
    for(var i=0; i<this.state.productImageArray.length; i++){
      var formValue = {
        productImage  : this.state.productImageArray[i].productImage,
        itemCode      : this.state.productImageArray[i].itemCode
      }
      axios.patch('/api/products/patch/bulkimages/', formValue)
      .then((response)=>{
        console.log('/api/products/patch/bulkimages/ res', response.data);
        this.getData();
        swal(response.data.message);
        $(':input').val('');
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
  }
  
  getUploadBulUSPercentage(){
  }
  deleteproductImages(event){
    event.preventDefault(); 
    var id = event.target.getAttribute('data-productid');
    var image = event.target.getAttribute('data-image');
    var formValues = {
      product_ID    : id,
      imageLik      : image
    }

    swal({
          title: "Are you sure you want to delete this image?",
          text: "Once deleted, you will not be able to recover this image!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((success) => {
            if (success) {
              swal("Your image is deleted!");
              
                axios.patch('/api/products/remove/image', formValues)
                .then((res)=>{
                  this.getData();
                })
                .catch((error)=>{
                  console.log('errro', error);
                })
            
            } else {
            swal("Your image is safe!");
          }
        });

 
  }
    
  render(){
    return( 

      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                 <div className="">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                          <h4 className="NOpadding-right">  Product Image Bulk Upload</h4>
                    </div>
                     
                    <form className="addRolesInWrap newTemplateForm">
                      <div className="">
                        <div className="col-lg-4 col-lg-offset-3  col-md-4 col-md-offset-3 col-sm-12 col-xs-12 marginTopp">
                          <div className="form-group">
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category imageuploadtitle">
                              Upload Product Images 
                            </label>
                            <input type="file" className="form-control bulkuplodaProductImagesInp" multiple onChange ={this.bulkuplodaProductImages.bind(this)}/>
                            <div>{this.getUploadBulUSPercentage()}</div>
                          </div>
                        </div>
                        {
                          this.state.progressLength === 100 ?
                          <div className="col-lg-4  col-md-4 col-sm-12 col-xs-12">
                            <div className="form-group">
                              <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category imageuploadtitle">&nbsp; </label>
                              <button className="btn btn-primary" onClick={this.saveImages.bind(this)}>Save Images</button>
                            </div>
                          </div>
                        :
                        null
                        }
                        
                      </div>
                    </form>
                     

                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12 upldImgTextColor">
                        Image name must be saved in format <span className="upldImgTextColor1">Your Item Code</span> - <span className="upldImgTextColor2">Image Number for that product. </span>
                        eg. ItemCode0-1, ItemCode0-2, ItemCode0-3, ... etc.
                      </div>
                      {
                        this.state.progressLength === 0 || this.state.progressLength === 100 ?
                        null
                        :
                        <div className="progress img-progress col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12 NOpadding">
                          <div className="progress-bar col-lg-12 col-md-12 col-xs-12 col-sm-12" role="progressbar" style={{width:""+this.state.progressLength+"%"}}>
                            <span className="img-percent">{this.state.progressLength}% Complete</span>
                          </div>
                        </div>
                      }
                      
                      <div className="col-lg-12">
                        {
                          this.state.notuploadedImages.length > 0 ?

                            <div className="notBlkUplImgListOuter">
                              <div className="notBlkUplImgListTitle">
                                Images not Uploaded
                              </div>
                              {
                                this.state.notuploadedImages.map((data, index)=>{
                                  return (
                                    <div className="notBlkUplImgList" key={index}> 
                                      {data}
                                    </div>
                                  );
                                })
                              }
                            </div>
                          :

                          ""
                        } 
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                      <div className="create-email-template-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div>
                          <div className="HRMSWrapper col-lg-12">
                            <table className="table iAssureITtable-bordered table-striped table-hover">
                              <thead className="tempTableHeader">
                                <tr >
                                  <th className="col-lg-1 umDynamicHeader srpadd">Sr no.</th>
                                  <th className="col-lg-2 umDynamicHeader srpadd">Item Code</th>
                                  <th className="col-lg-2 umDynamicHeader srpadd">Product Name</th>
                                  <th className="col-lg-7 umDynamicHeader srpadd">Images</th>
                                </tr>
                              </thead>
                              <tbody>
                                {  
                                  this.state.allshopproductimages.map((data,index)=>{
                                    
                                    return(
                                      <tr key ={index}>
                                        <td> {index+1}     </td>
                                        <td> {data.itemCode}    </td>
                                        <td> {data.productName}    </td>
                                        <td>
                                        {
                                          data.productImage.length > 0 ? 
                                            <div className="deleteimagewrapper bulkimagebg">  
                                              {  
                                                data.productImage.map((imgdata,index)=>{
                                                  return(
                                                    <div className="col-lg-3 deleteImgBlkUpldCol-lg-3" key={index}>
                                                      imgdata
                                                      <i className="fa fa-times deleteImgBlkUpld" aria-hidden="true" data-image={imgdata} data-productid={data._id}   onClick={this.deleteproductImages.bind(this)}></i>
                                                      <img src={imgdata} className="img-thumbnail"/>
                                                    </div>
                                                  );
                                                })
                                              }
                                            </div>
                                          :
                                          <div className="bulkImgUpldNotShown">
                                            No Images Available
                                          </div>
                                        }
                                        </td>
                                      </tr> 
                                    )
                                  })
                                }   
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
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
export default BulkProductImageUpload ;