import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from "jquery";
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';


class ExpenseTypeMaster extends Component{
   constructor(props) {
    super(props);
    this.state = {
      type         : '',
      CGSTRate     : '',
      SGSTRate     : '',
      submitVal    : true,
      expenseData  : []

    };
    this.handleChange = this.handleChange.bind(this);
  }

  
  componentDidMount() {
    $.validator.addMethod("regxtax", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid tax rate.");

    $("#ExpenseTypeMasterForm").validate({
    rules: {
      type: {
        required: true,
      },
      CGSTRate: {
        required: true,
        regxtax: /^[1-9]\d*(\.\d+)?$/
      },
      SGSTRate: {
        required: true,
        regxtax: /^[1-9]\d*(\.\d+)?$/
      },
    }
    });
    axios.get('/api/expensetypemaster/showAllData')
    .then((response)=>{
      this.setState({expenseData:response.data})
    })
    .catch((error)=>{
      console.log('error: ',error)
    })
    
  }
  submitData(event){
    event.preventDefault();
   
    var formValues = {
      type             : this.state.type,
      CGSTRate         : this.state.CGSTRate,
      SGSTRate         : this.state.SGSTRate,
    }//close array

    var updateFormValues = {
      Id            : this.state.Id,
      type          : this.state.type,
      CGSTRate      : this.state.CGSTRate,
      SGSTRate      : this.state.SGSTRate,
    }//close array

    if($("#ExpenseTypeMasterForm").valid()){
      if (this.state.submitVal) {
        axios.patch('/api/expensetypemaster/insertExpenseType',formValues)
        .then(function (response) {
          if(response.data.duplicated == true)
          {
          swal("Data Already Exist");
          }else{
            swal({
                  title: "Expense Type details added successfully!",
                  text: "Expense Type details added successfully!",
          });
          }   
        })
        .catch(function (error) {
          swal({
                  title: "Failed to add Expense Type details!",
                  text: "Failed to add Expense Type details!",
                });
        })
      }else{
        axios.patch('/api/expensetypemaster/updateExpenseType',updateFormValues)
        .then(function (response) {
         
          swal({
                  title: "Expense Type details updated successfully!",
                  text: "Expense Type details updated successfully!",
          });
          
        })
        .catch(function (error) {
          swal({
                  title: "Failed to update Expense Type details!",
                  text: "Failed to update Expense Type details!",
                });
        })
      }
    }
    this.setState({
      type : '',
      CGSTRate:'',
      SGSTRate:'',
      submitVal:true
    })
    axios.get('/api/expensetypemaster/showAllData')
    .then((response)=>{
      this.setState({expenseData:response.data})
    })
    .catch((error)=>{
      console.log('error: ',error)
    })
}

handleChange(event){
  const {name,value} = event.target;
  this.setState({ 
    [name]:value
  });
}

edit(event){
  event.preventDefault();
  this.setState({submitVal : false})
  $("html,body").scrollTop(0);
  var id = event.currentTarget.id;
  axios.get('/api/expensetypemaster/getSingleData/'+id)
  .then((response)=>{
    this.setState({
      Id         : response.data[0]._id,
      type       : response.data[0].type,
      CGSTRate     : response.data[0].CGSTRate,
      SGSTRate   : response.data[0].SGSTRate,
    })
  })
  .catch((error)=>{
    swal(error)
  })
    
}
del(event){
  event.preventDefault();
  var targetedID = event.currentTarget.id;
  swal("Are you sure you want to delete this data?", {
    dangerMode: true,
    buttons: true,
  }).then((res)=>{
      if(res == true){
        axios.delete('/api/expensetypemaster/delete/'+targetedID)
        .then((response)=>{
          swal({
              title: 'Deleted successfully!',
              text: "",
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#666',
              // cancelButtonColor:'#d33',
              confirmButtonText: 'ok'});
          axios.get('/api/expensetypemaster/showAllData')
          .then((response)=>{
            this.setState({expenseData:response.data})
          })
          .catch((error)=>{
            console.log('error: ',error)
          })
        })
        .catch((error)=>{
          swal(error)
        })
      }else{}
    })

  
}

  render(){
    
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
            <section className="content">
              <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Expense Type Master</h4>
                </div>
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <form id="ExpenseTypeMasterForm"  >
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="labelform" >Expense Type</label><span className="astrick">*</span>
                                <input id="type" value={this.state.type} data-text="type" onChange={this.handleChange.bind(this)} type="text" name="type" ref="type" className="form-control areaStaes" />
                            </div>  
                          </div>
                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="labelform" >CGST Rating</label><span className="astrick">*</span>
                                <input id="CGSTRate" value={this.state.CGSTRate} data-text="CGSTRate" onChange={this.handleChange.bind(this)} type="number" name="CGSTRate" ref="CGSTRate" className="form-control areaStaes" minLength="1" maxLength="4" />
                            </div>  
                          </div>
                          <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="labelform" >SGST Rating</label><span className="astrick">*</span>
                                <input id="SGSTRate" value={this.state.SGSTRate} data-text="SGSTRate" onChange={this.handleChange.bind(this)} type="number" name="SGSTRate" ref="SGSTRate" className="form-control areaStaes" minLength="1" maxLength="4" />
                            </div>  
                          </div>
                        </div>
                        
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                        <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitData.bind(this)} >
                          { this.state.submitVal ? "Submit" : "Update" }  
                        </button>
                      </div>
                    </form>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      { this.state.expenseData && this.state.expenseData.length > 0 ?
                        this.state.expenseData.map( (data,index)=>{
                        return (
                          <div className="col-lg-12 col-md-12">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 boxTx" key={index}>
                              <div className="liheader1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <i className="fa fa-calculator" aria-hidden="true"></i>
                              </div>
                              <ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
                                <li>{data.type}</li>
                                <li>{data.CGSTRate} %</li>
                                <li>{data.SGSTRate} %</li>
                              </ul>
                              <div className="liheader1 dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
                                <div className="dropdown-content">
                                
                                  <ul className="pdcls ulbtm">
                                    <li>  
                                        <a href="#" onClick={this.edit.bind(this)} id={data._id}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>
                                      </li>
                                      <li>
                                        <a onClick={this.del.bind(this)} id={data._id}><i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete</a>
                                      </li>
                                    </ul>
                                </div>
                              </div>
                            </div>
                            </div>
                          )
                        })
                        :
                        null
                      }
                    </div>
                    
                  </div>
                </div>
               </div>
            </section>
          </div>
        </div>
      </div>

      );
  }

 }

 export default ExpenseTypeMaster;