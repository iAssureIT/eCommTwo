import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import ReactTable             from "react-table";
import moment                 from "moment";
// import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";
import swal                   from 'sweetalert';
import _                      from 'underscore';


class AllocateToFranchiseModal extends Component{
    constructor(props) {
        super(props);

        if(!this.props.loading){
            this.state = {
                "orderData":[],
                // "notificationData" :Meteor.subscribe("notificationTemplate"),
            };
        } else{
            this.state = {
                "orderData":[],
            };
        }
        window.scrollTo(0, 0);
    }

    componentDidMount() {

    }
    addDispatchDetails(event){
        event.preventDefault();
        
        var id = $(event.currentTarget).attr('id');

        var businessAssociate = $('.allocateToFranchiseForm').find('#businessAssociate').val();

        var expDeliveryDate = $('.expDeliveryDate').val();
        
        if(businessAssociate !== '' ){
          var formValues = {
                          "orderID"             :  id,
                          "userid"              :  localStorage.getItem('admin_ID'),
                          "businessAssociateId" : businessAssociate
                          }
          console.log(formValues);

          axios.patch('/api/orders/patch/dispatchOrder', formValues)
          .then((response)=>{
            console.log('response', response);
            swal({
              title : response.data.message,
            });
             if(response.status === 200){
                
                    swal({
                        title: 'Order is dispatched Successflly',
                    });
                    // this.getOrders();
                    var modal = document.getElementById('adminModal');
                    modal.style.display = "none";
                    $('#businessAssociate').val('');
                    $('.expDeliveryDate').val('');
                    
                    window.location.reload();
                }
          })
          .catch((error)=>{
            console.log('error', error);
          })
            
        }else{
            swal({
                title: 'Please fill all fields',
            });
        } 
  
    }
    closeModal(event){
       event.preventDefault();
        // console.log('event',event);
        var modal = document.getElementById('adminModal');
        
        modal.style.display = "none";
        
       
        $('.dispatchCompanyName').val('');
        $('.deliveryPersonName').val('');
        $('.deliveryPersonContact').val('');
    }
    
    render(){
        return( 
          <div className="col-lg-12">
                <div className="modal-dialog adminModal addressModal-dialog" id="adminModal">
                  <div className="modal-content">
                    <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">                                                                              
                      <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11">Allocate To Franchise</h4>
                      <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-12 NOpadding-left NOpadding-right">
                        <button type="button" className="adminCloseButton" data-dismiss="modal" >&times;</button>
                      </div>
                    </div>
                    <div className="modal-body">
                      <form className="allocateToFranchiseForm" onSubmit={this.addDispatchDetails.bind(this)} id={this.props.orderId}>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="row inputrow">
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                            <div className="form-group">
                                <br/>
                                <label>Franchise</label><span className="astrick">*</span>
                                <div className="input-group">
                                <span className="input-group-addon" id="basic-addon1"><i className="fa fa-building	" aria-hidden="true"></i></span>
                                    <select className="form-control" id="businessAssociate">
                                    { this.props.FranchiseArray ?
                                        this.props.FranchiseArray.map( (data, index)=>{
                                            return (
                                                <option value={data._id}>{data.companyName}</option>
                                            );
                                        })
                                        :
                                        null
                                    }
                                    </select>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                      </div>
                      <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <input  type="submit" className="btn adminFinish-btn col-lg-6 col-lg-offset-6 col-md-6 col-md-offset-6 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" value="ALLOCATE" />
                          </div>
                      </div>
                  </form>
                      <br/>
                    </div>
                    <div className="modal-footer">
                      
                    </div>
                  </div>
                </div>
              }
            </div>
        );
    }
}

export default AllocateToFranchiseModal;
