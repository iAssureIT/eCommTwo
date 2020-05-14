import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';
import BulkUploadComponent from './BulkUploadComponent';
import  '../css/productBulkUpload.css'
import Message from '../../../../coreAdmin/common/message/Message.js';
import { bindActionCreators } from 'redux';
import { getProductData, getProductCount, getVendor} from '../../../../actions/index';
import { connect } from 'react-redux';
class AddNewBulkProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "currentProducts": [],
            "productData": [],
            "file": props && props.fileData && props.fileData[0] ? props.fileData[0].fileName : '',
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.productData) {
            this.setState({
                productData: nextProps.productData
            });
        }
        if (nextProps.fileData && nextProps.fileData.length > 0) {
            var file = nextProps.fileData[0].fileName;
            var productData = nextProps.productData;

            function checkAdult(data) {
                return data.fileName == file;
            }
            var x = productData.filter(checkAdult);

            this.setState({
                productData: x
            });
        }
    }
    componentDidMount() {
        this.getVendorList();
        this.getSectionData();
        this.props.fetchvendor()
;    }
    getSectionData() {
        axios.get('/api/sections/get/list')
          .then((response) => {
              
            this.setState({
              sectionArray: response.data
            })
          })
          .catch((error) => {
            console.log('error', error);
          })
    }
    showRelevantCategories(event) {
        var section = event.target.value;
        this.setState({
          section: event.target.value,
          section_ID: event.target.value.split('|')[1],
          messageData : {},
          fileurl:null
        })
        axios.get('/api/category/get/list/' + event.target.value.split('|')[1])
          .then((response) => {
            this.setState({
              categoryArray: response.data,
              category: "Select Category",
              subCategory: "Select Sub-Category",
            })
          })
          .catch((error) => {
            console.log('error', error);
          })
    }
    showProgressBar() {
        // var getPercernt = UserSession.get("progressbarSession",Meteor.userId());
        // var allPercernt = UserSession.get("allProgressbarSession",Meteor.userId());

        // if(getPercernt && allPercernt){
        //     var total = getPercernt/allPercernt*100;
        //     total = parseInt(total);
        //     var styleC = {
        //         width:total + "%",
        //         display:"block",
        //     }
        //     var styleCBar = {
        //         display:"block",
        //     }
        // }
        // if(!getPercernt){
        //     var total = 0;

        //     var styleC = {
        //         width:0 + "%",
        //         display:"none",
        //     }
        //     var styleCBar = {
        //         display:"none",
        //     }
        // }
        // // console.log('total',total);
        // if(total == 100){
        //     return (
        //         <div></div>
        //     );
        // }else{
        //     return (
        //         <div>
        //             <div className="progress"  style= {styleCBar}>
        //                 <div className="progress-bar progress-bar-striped active" role="progressbar"
        //                 aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
        //                     {total} %
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // }
    }
    selectOption(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value,
            messageData : {}
        });
    }
    async getVendorList() {
        // await this.props.fetchvendor();
    }
    handleChangeCategory(event){
        event.preventDefault();
        this.setState({
          category: event.target.value,
          category_ID: event.target.value.split('|')[1],
        })
        axios.get('/api/bulkUploadTemplate/get/' + event.target.value.split('|')[1])
          .then((response) => {
              
            if (response.data) {
                this.setState({fileurl:response.data.templateUrl, messageData : {}})    
            }else{
                this.setState({
                    fileurl:null,
                        messageData : {
                            "type" : "outpage",
                            "icon" : "fa fa-exclamation",
                            "message" : "Selected category does not have any template. Please upload template.",
                            "class": "warning",
                            "autoDismiss" : true
                        }
                    })
            }
            
          })
          .catch((error) => {
            console.log('error', error);
          })
    }
    render() {
        const SheetJSFT = [
            "xlsx",
            "xls"
        ]
        const requiredData = {vendor: this.state.vendor};
        return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-right">
            <section className="content">
            <Message messageData={this.state.messageData} />
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                    <div className="addNewProductWrap col-lg-12 col-md-12 col-sm-12 col-xs-12 add-new-productCol">
                        <div className="box">
                            <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpading">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 pull-left" >
                                <h4 className="NOpadding-right">Product Bulk Upload</h4>
                                </div>
                                {
                            localStorage.getItem('role') == 'superAdmin' ? 
                            <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pull-right" >
                                <a href="/template-management"><button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform clickforhideshow">Add Template</button></a>
                            </div>
                            : null
                        }
                            </div>

                        </div>
                        
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 inputFields marginTopp">
                            <label>Vendor <i className="redFont">*</i></label>
                            <select onChange={this.selectOption.bind(this)} value={this.state.vendor} name="vendor" className="form-control allProductCategories" aria-describedby="basic-addon1" id="vendor" ref="vendor">
                                <option disabled selected defaultValue="">Select Vendor</option>
                                {
                                    this.props.vendor ?
                                        <option value={this.props.vendor.companyName + '|' + this.props.vendor.user_ID + '|' + this.props.vendor._id}>{this.props.vendor.companyName} - ({this.props.vendor.vendorID})</option>
                                    :
                                    <option disabled>{"No vendor added"}</option>
                                }
                            </select>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 inputFields marginTopp">
                            <label>Section <i className="redFont">*</i></label>
                            <select onChange={this.showRelevantCategories.bind(this)} value={this.state.section} name="section" className="form-control" aria-describedby="basic-addon1" id="section" ref="section">
                                <option disabled selected defaultValue="">Select Section</option>
                                {this.state.sectionArray && this.state.sectionArray.length > 0 ?
                                    this.state.sectionArray.map((data, index) => {
                                        return (
                                            <option key={index} value={data.section + '|' + data._id} >{data.section}</option>
                                        );
                                    })
                                    :
                                    <option disabled>{"Section not available"}</option>
                                }
                            </select>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 inputFields marginTopp">
                            <label>Category <i className="redFont">*</i></label>
                            <select onChange={this.handleChangeCategory.bind(this)} value={this.state.section} name="category" value={this.state.category}  className="form-control" aria-describedby="basic-addon1" id="category" ref="category">
                                <option disabled selected defaultValue="">Select Category</option>
                                {this.state.categoryArray && this.state.sectionArray.length > 0 ?
                                    this.state.categoryArray.map((data, index) => {
                                        return (
                                            <option key={index} value={data.category + '|' + data._id} >{data.category}</option>
                                        );
                                    })
                                    :
                                    <option disabled>{"Category not available"}</option>
                                }
                            </select>
                        </div>
                        <br/>
                    </div>
                    {
                       this.state.vendor &&  this.state.fileurl ?
                        <BulkUploadComponent url="/api/states/post/bulkinsert" 
                            fileurl={this.state.fileurl}
                            fileDetailUrl="/api/products/get/filedetails/"
                            requiredData={requiredData}
                            />   : null    
                        
                    }
                </div>
            </div>
        </section>
      </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        vendor: state.vendor,
    }
}
const mapDispachToProps = (dispatch) => {
    return bindActionCreators({ fetchproducts: getProductData, fetchproductcount:getProductCount,fetchvendor:getVendor }, dispatch)
}
export default connect(mapStateToProps, mapDispachToProps)(AddNewBulkProduct);