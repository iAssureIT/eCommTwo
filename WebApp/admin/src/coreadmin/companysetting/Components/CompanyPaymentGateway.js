import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import IAssureTable from '../../IAssureTable/IAssureTable.jsx';
class CompanyPaymentGateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namepayg    : "",
      environment : "",
      status      : "",
      secretkey   : "",
      partnerid   : "",    
      paymentgatewayid   : "",    

      tableHeading      : {
        namepayg        : "Name Payment gateway",
        environment     : "Environment",
        status          : "Status",
        secretkey       : "Secret Key",
        partnerid       : "Partner Id",
        actions         : 'Action',
      },

      tableObjects      : {
        deleteMethod    : 'delete',
        apiLink         : '/api/paymentgateway/',
        paginationApply : false,
        searchApply     : false,
        editUrl         : '/technical-masters'
      },
      startRange        : 0,
      limitRange        : 10000,
      // editId: this.props.match.params ? this.props.match.params.pg_fieldID : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.getData(this.state.startRange, this.state.limitRange);
    window.scrollTo(0, 0);
    // this.edit(this.props.match.params.fieldID);
    // console.log('this.params',this.props.match.params.pg_fieldID);
    // console.log('this.props.match.params.fieldID',this.props.match.params.fieldID);
    // var editId = this.props.match.params.fieldID;
    // var edId = editId.split('_')[1];
    // this.setState({
    //     editId: edId
    // },()=>{
    //   this.edit(this.state.editId);
    // })
  } 
  componentWillReceiveProps(nextProps) {
    // var editId = nextProps.match.params.fieldID;
    // var edId = editId.split('_')[1];
    // if (nextProps.match.params.fieldID) {
    //   this.setState({
    //       editId: edId
    //   },()=>{
    //     this.edit(this.state.editId);
    //   })
    // }
  }

  handleChange(event){
    const {name,value} = event.target;
    this.setState({ 
      [name]:value
    });
  }  
  getData(startRange, limitRange){
    var data = {
      limitRange : limitRange,
      startRange : startRange,
    }
    axios.post('/api/paymentgateway/post/alllist',data)
            .then((response) => {
                console.log(" response.data Post==>", response.data);
                var tableData = response.data.map((a, i)=>{
                    return({
                        _id         : a._id,
                        namepayg    : a.namepayg,
                        environment : a.environment,
                        status      : a.status,
                        secretkey   : a.secretkey,
                        partnerid   : a.partnerid,
                    })
                })
             
                this.setState({ 
                  paymentgatewayInfo: response.data, 
                  tableData: tableData
                });
                console.log("tableData",this.state.tableData);
            })
            .catch((error) => {});
  }
  submitPaymentInfo(event){
      event.preventDefault(); 
        var paymentgateway ={
          namepayg    : this.state.namepayg,
          environment : this.state.environment,
          status      : this.state.status,
          secretkey   : this.state.secretkey,
          partnerid   : this.state.partnerid,
          createdBy   : this.state.createdBy,
          type        : 'PG',
        }
        console.log("paymentgateway ==>>",paymentgateway);
       
      // if($("#CompanyPaymentGatewayForm").valid()){
          axios.post('/api/projectsettings/post',paymentgateway)
          .then((response)=> {
            console.log("response in paymentgateway ==>>",response.data);
            this.getData(this.state.startRange, this.state.limitRange);
            swal({                
                  text: "Payment Gateway details added successfully!",
                });
            
            this.setState({
              namepayg    : " ",
              environment : " ",
              status      : " ",
              secretkey   : " ",
              partnerid   : " ",
            })
            this.getData(this.state.startRange, this.state.limitRange);
          })
          .catch((error)=> {
            swal({                
                  text: "Failed to add payment gateway details!",
                });
          })
        
  
      // }  
  }
  updatepaymentgateway(event){
    event.preventDefault();
      var paymentgateway ={
        namepayg    : this.state.namepayg,
        environment : this.state.environment,
        status      : this.state.status,
        secretkey   : this.state.secretkey,
        partnerid   : this.state.partnerid,
        createdBy   : this.state.createdBy,
      }
     
    // if($("#CompanyPaymentGatewayForm").valid()){
      var paymentgatewayid = this.state.paymentgatewayid;
      console.log("paymentgatewayid==>",paymentgatewayid)
        axios.patch('/api/paymentgateway/patch/'+paymentgatewayid,paymentgateway)
        .then((response)=> {
          this.getData(this.state.startRange, this.state.limitRange);
          swal({                
                text: "Payment Gateway details Updated successfully!",
              });
          
          this.setState({
            namepayg    : " ",
            environment : " ",
            status      : " ",
            secretkey      : " ",
            partnerid   : " ",
          })
        })
        .catch((error)=> {
          swal({                
                text: "Failed to Updated payment gateway details!",
              });
        })
      

    // }
  }

  edit(editId) {
    console.log('editId');
		// event.preventDefault();
		// $("html,body").scrollTop(0);
  //   var id = event.currentTarget.getAttribute('data-id');
  //   console.log("id edit ==>",id);
  //   this.props.history.push("/technical-masters/paymentgateway" + id);
  //   // /technical-masters/paymentgateway-:fieldID
  //   axios.get('/api/paymentgateway/get/one/'+id)
  //   .then((response)=> {
  //     console.log("response in paymentgateway ==>>",response.data);
  //     this.setState({ 
  //         paymentgatewayid : response.data._id,
  //         namepayg    : response.data.namepayg,
  //         environment : response.data.environment,
  //         status      : response.data.status,
  //         secretkey   : response.data.secretkey,
  //         partnerid   : response.data.partnerid,
  //         createdBy   : response.data.createdBy,
  //     });
  //   })
  //   .catch((error)=> {
  //   })
		// this.props.history.push('/global-masters/paymentgateway/'+ id);
  }
  
  deleteDriver(event){
    event.preventDefault();
    this.setState({deleteID: event.currentTarget.getAttribute('data-id')})
    $('#deleteModal').show();
  }
  closeModal(event){
    event.preventDefault();
    $('#deleteModal').hide(); 
  }
  confirmDelete(event){
    event.preventDefault();
    axios.delete('/api/paymentgateway/delete/'+this.state.deleteID)
    .then((response)=> {
      swal({                
            text: "Payment Gateway details Deleted successfully!",
          });
      $('#deleteModal').hide(); 
      this.getData(this.state.startRange, this.state.limitRange);
    })
    .catch((error)=> {
      swal({                
            text: "Failed to Delete payment gateway details!",
          });
    })    
  }
  render() {
    return (
      <div className="">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4 className="">Payment Gateway</h4>
          </div>
          <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <form id="CompanyPaymentGatewayForm">
              <div className="form-margin col-lg-6 col-md-6 col-xs-12 col-sm-12  valid_box ">
                <label className="labelform">Name Payment Gateway <span className="requiredsign">*</span></label>
                <input type="text" style={{ textTransform: 'capitalize' }}
                  className="form-control UMname has-content"
                  id="namepayg" ref="namepayg" name="namepayg" data-text="namepayg" placeholder="Name Payment Gateway" onChange={this.handleChange}
                  value={this.state.namepayg} />
              </div>
              <div className="form-margin col-lg-6 col-md-6 col-xs-12 col-sm-12  valid_box">
                <label className="labelform">Environment <span className="requiredsign">*</span></label>
                <input type="text" className="form-control UMname  has-content"
                  id="environment" ref="environment" name="environment" data-text="environment" onChange={this.handleChange}
                  value={this.state.environment} placeholder="Environment" />
              </div>
              <div className="form-margin col-lg-6 col-md-6 col-xs-12 col-sm-12  valid_box ">
                <label className="labelform">Status <span className="requiredsign">*</span></label>
                <input type="text" style={{ textTransform: 'capitalize' }}
                  className="form-control UMname has-content"
                  id="status" ref="status" name="status" data-text="status" placeholder="Status" onChange={this.handleChange}
                  value={this.state.status} />
              </div>
              <div className="form-margin col-lg-6 col-md-6 col-xs-12 col-sm-12  valid_box">
                <label className="labelform">Secret Key <span className="requiredsign">*</span></label>
                <input type="text" className="form-control UMname  has-content"
                  id="secretkey" ref="secretkey" name="secretkey" data-text="secretkey" onChange={this.handleChange}
                  value={this.state.secretkey} placeholder="Secret Key" />
              </div>
              <div className="form-margin col-lg-6 col-md-6 col-xs-12 col-sm-12  valid_box">
                <label className="labelform">Partner Id <span className="requiredsign">*</span></label>
                <input type="text" className="form-control UMname  has-content"
                  id="partnerid" ref="partnerid" name="partnerid" data-text="partnerid" onChange={this.handleChange}
                  value={this.state.partnerid} placeholder="Partner Id" />
              </div>
              <div className=" col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                {
                  this.state.paymentgatewayid === "" ?
                  <button className="col-lg-3 col-md-2 col-xs-12 col-sm-12 col-xs-12 pull-right btn button3 topMargin outlinebox" type="submit" onClick={this.submitPaymentInfo.bind(this)} >Submit</button>
                  :
                  <button className="col-lg-3 col-md-2 col-xs-12 col-sm-12 col-xs-12 pull-right btn button3 topMargin outlinebox" type="updatepaymentgateway" onClick={this.updatepaymentgateway.bind(this)} >Update</button>
                }
                
              </div>
            </form>
            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <IAssureTable
                  tableHeading={this.props.tableHeading}
                  tableData={this.state.tableData}
                  getData={this.getData.bind(this)}
                  tableObjects={this.props.tableObjects}
              />
              </div> */}
            {/*<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <table className="table iAssureITtable-bordered table-striped table-hover">
                <thead className="tempTableHeader">
                  <tr className="">
                    <th className="umDynamicHeader srpadd textAlignCenter"> Sr No. </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Name Payment gateway </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Environment</th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Status </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Secret Key </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Partner Id </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.paymentgatewayInfo ?
                    this.state.paymentgatewayInfo.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td className="textAlignCenter">{index + 1}</td>
                          <td className="textAlignCenter">{data.namepayg}</td>
                          <td className="textAlignCenter">{data.environment}</td>
                          <td className="textAlignCenter">{data.status}</td>
                          <td className="textAlignCenter">{data.secretkey}</td>
                          <td className="textAlignCenter">{data.partnerid}</td>
                          <td className="textAlignCenter">
                            <span>
                              <button title="Edit"   data-id={data._id}  onClick={this.edit.bind(this)}><i className="fa fa-pencil" ></i></button> &nbsp; &nbsp;
                              <button title="Delete" data-id={data._id}  onClick={this.deleteDriver.bind(this)}> <i className="fa fa-trash redFont" ></i></button> 
                            </span>
                          </td>
                        </tr>
                      );
                    })
                    :
                    null
                  }
                </tbody>
              </table>
            </div>*/}
            <div className="">
              <IAssureTable
                tableHeading={this.state.tableHeading}
                twoLevelHeader={this.state.twoLevelHeader}
                dataCount={this.state.dataCount}
                tableData={this.state.tableData}
                tableObjects={this.state.tableObjects}
                getData={this.getData.bind(this)}
              />
            </div>
            <div className="modal" id="deleteModal" role="dialog">
                <div className="adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="modal-content adminModal-content col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                      <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                            <button type="button" className="adminCloseButton" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
                          </div>
                        </div>
                        <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <h4 className="blackLightFont textAlignCenter examDeleteFont col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure, do you want to delete?</h4>
                      </div>
                        <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <button type="button" className="btn adminCancel-btn col-lg-7 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.closeModal.bind(this)}>CANCEL</button>
                                  </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <button type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.confirmDelete.bind(this)} >DELETE</button>
                          </div>
                      </div>
                    </div>
                </div>
            </div>  
          </div>
        </div>
      </div>

    );
  }

}

export default CompanyPaymentGateway;








//  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//             <form id="CompanyPaymentGatewayForm"  >
//               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
//                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
//                   <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group">
//                         <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyNamechkbx" value="cashOnDelivery" onChange={this.handleChange.bind(this)}/>
//                         <label className="labelform" >Cash on Delivery</label><span className="astrick"></span>
//                     </div>  
//                   </div>

//                   <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group">
//                       <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyNamechkbx"  value="paytm" onChange={this.handleChange.bind(this)}/>
//                       <label className="labelform" >Paytm</label><span className="astrick"></span>
//                     </div>  
//                   </div>
//                 </div>
//                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
//                   <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group">
//                       <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyName" value="UPI" onChange={this.handleChange.bind(this)}/>
//                       <label className="labelform" >UPI</label><span className="astrick"></span>
//                     </div> 
//                   </div>
//                   <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group">
//                       <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyName" value="bankTransfer"  onChange={this.handleChange.bind(this)}/>
//                       <label className="labelform" >Bank Transfer</label><span className="astrick"></span>
//                     </div> 
//                   </div>

//                 </div>
//               </div>
//               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
//                 { this.state.arrayValues && this.state.arrayValues.length>0 ? 
//                   <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitPaymentInfo.bind(this)}>
//                     { this.state.submitVal ? "Submit" : "Update" }  
//                   </button>
//                   : 
//                   <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right"  id="disabledbtnCheck" disabled onClick={this.submitPaymentInfo.bind(this)}>
//                     { this.state.submitVal ? "Submit" : "Update" }  
//                   </button>
//                 }
//               </div>
//             </form>
//           </div>