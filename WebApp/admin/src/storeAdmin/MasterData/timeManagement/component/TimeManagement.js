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
import '../css/TimeManagement.css';


class ShippingManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "addEditMode": "",
      

      "tableHeading": {
        fromtime: "From Time",
        totime: "To Time",
        actions: 'Actions',
      },
      "tableObjects": {
        deleteMethod: 'delete',
        apiLink: '/api/time/',
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

    $("#ShippingManagement").validate({
      rules: {
        
        section: {
          required: true,
          regxA1: /^[a-zA-Z0-9@&()_+-\s]*$/i,
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "fromtime") {
          error.insertAfter("#fromtime");
        }

        if (element.attr("name") === "totime") {
          error.insertAfter("#totime");
        }
        if (element.attr("name") === "shippingcost") {
          error.insertAfter("#shippingcost");
        }
      }
    });
    this.getDataCount();
    this.getData(this.state.startRange, this.state.limitRange);
  }

  getDataCount() {
    axios.get('/api/time/get/count')
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
    axios.get('/api/time/get/list-with-limits/' + startRange + '/' + limitRange)
      .then((response) => {
        console.log('tableData = ', response.data);
        this.setState({
          tableData: response.data
        })
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  shippingallows(allow) {
    console.log('shippingallows :===> ', allow);
        this.setState({
          shippingallow: allow
        })
  }


  submitsection(event) {
    event.preventDefault();
    // if ($('#ShippingManagement').valid()) {
      var formValues = {
        "fromtime"   : this.state.fromtime,
        "totime"     : this.state.totime,
        "createdBy"    : localStorage.getItem("admin_ID")
      }
      console.log("response formValues==>",formValues);
      axios.post('/api/time/post', formValues)
        .then((response) => {
          console.log("response submitshipping==>",response.data);
          swal({
            text: response.data.message,
          });
          this.setState({
            "fromtime"   : '',
            "totime"     : '',
          });
          this.getData(this.state.startRange, this.state.limitRange);
        })
        .catch((error) => {
          console.log('error', error);
        });

    // }
  }
  updatesection(event) {
    event.preventDefault();
      var formValues = {
        "fromtime"    : this.state.fromtime,
        "totime"      : this.state.totime,
        "TimeID"      : this.state.editId,
      }
      axios.patch('/api/time/patch', formValues)
        .then((response) => {
          swal({
            text: response.data.message,
          });
          this.setState({
            "fromtime": '',
            "totime": '',
            "editId" : '',
            "shippingcost": '',
          });
          this.props.history.push('/project-master-data');
          this.getData(this.state.startRange, this.state.limitRange);
        })
        .catch((error) => {
          console.log('error', error);
        });
  }
  edit(id) {
    axios.get('/api/time/get/one/' + id)
      .then((response) => {
        console.log('edit = ', response.data);
        if (response.data) {
          this.setState({
            "fromtime"     : response.data.fromtime,
            "totime"       : response.data.totime,
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  createsectionUrl(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
    var url = event.target.value;
    // console.log('url',url);
    if (url) {
      url = url.replace(/\s+/g, '-').toLowerCase();
      // $(".productUrl").val(url);
      this.setState({
        sectionUrl: url
      })
    }
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                  <div className="box">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                      <h4 className="NOpadding-right">Time Master </h4>
                    </div>
                      <div className="col-lg-12 col-md-12 marginTopp NOpadding">
                      <form id="ShippingManagement" className="">
                          <div className="col-lg-5 fieldWrapper">
                            <div className="col-lg-12">
                              <label>Shipping From Time <i className="redFont">*</i></label>
                              <input value={this.state.fromtime} name="fromtime" id="fromtime" onChange={this.createsectionUrl.bind(this)} type="text" className="form-control edit-catg-new" placeholder="From Time" ref="fromtime" />
                            </div>
                          </div> 
                          <div className="col-lg-5 fieldWrapper">
                            <div className="col-lg-12">
                              <label>Shipping To Time <i className="redFont">*</i></label>
                              <input value={this.state.totime} onChange={this.handleChange.bind(this)} id="totime" name="totime" type="text" className="form-control totime" placeholder="To Time" ref="totime" />
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
export default ShippingManagement;