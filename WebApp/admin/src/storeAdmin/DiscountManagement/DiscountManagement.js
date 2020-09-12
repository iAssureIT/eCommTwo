import React, { Component } from 'react';
import $ from 'jquery';
import IAssureTable from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import moment from 'moment';
class DiscountManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "addEditMode": "",

      discounttype: "",
      discountin: "",
      discountvalue: "",

      "tableHeading": { 
        discounttype: "Discount Type",
        discountin: "Discount In",
        discountvalue: "Discount Value",
        startdate: "Start Date",
        enddate: "End Date",
        actions: 'Action',
      },
      "tableObjects": {
        deleteMethod: 'delete',
        apiLink: '/api/discount/',
        paginationApply: true,
        searchApply: false,
        editUrl: '/discount-management'
      },
      "startRange": 0,
      "limitRange": 10,
      // "editId": this.props.editId ? this.props.editId : ''
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
    var editId = nextProps.match.params.editId;
    console.log("editId = ", editId);
    if (editId) {
      this.setState({
        editId: editId
      })
      this.edit(editId);
    }
  }
  // componentDidUpdate(prevProps) {
  //   // if(this.props.match.params.editId !== this.state.editId){
  //   console.log("editId componentDidUpdate= ", this.props.match.params.editId);

  //     this.setState({editId : this.props.match.params.editId});
  //   }
  componentDidMount() {
    this.setState({
      editId: this.props.match.params.editId,
    }, () => {
      console.log("this.state.editId = ", this.props.match.params.editId);
    })

    window.scrollTo(0, 0);
    if (this.props.match.params.editId) {
      this.edit(this.props.match.params.editId);
    }

    
    $.validator.addMethod("regxdiscounttype", function (value, element, arg) {
      return arg !== value;
    }, "Please select Discount Type.");
    $.validator.addMethod("regxdiscountin", function (value, element, arg) {
      return arg !== value;
    }, "Please select Discount In.");

    $("#OrderLevelDiscount").validate({
      rules: {
        discounttype:{
          required: true,
          regxdiscounttype: "-- Select Discount Type --"
        },
        discountin: {
          required: true,
          regxdiscountin: "-- Select Discount In --"
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "discountvalue") {
          error.insertAfter("#discountvalue");
        }

      }
    });
    this.getDataCount();
    this.getData(this.state.startRange, this.state.limitRange);
  }

  getDataCount() {
    axios.get('/api/discount/get/count')
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
    axios.get('/api/discount/get/list-with-limits/' + startRange + '/' + limitRange)
      .then((response) => {
        console.log('tableData = ', response.data);
        var tableData = response.data.map((a, i) => {
					return {
						_id: a._id,
						"discounttype"  : a.discounttype,
            "discountin"    : a.discountin,
            "discountvalue" : a.discountvalue,
            "startdate"     : moment(a.startdate).format("DD/MM/YYYY"),
            "enddate"       : moment(a.enddate).format("DD/MM/YYYY"),
						
					}
				})
        this.setState({
          tableData: tableData
        })
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  setLimit(event){
		event.preventDefault();
		var discounttype = this.refs.discounttype.value;
		this.setState({
			"discounttype":discounttype,
		});	
	}
  submitDiscount(event) {
    event.preventDefault();
    if ($('#OrderLevelDiscount').valid()) {
      var formValues = {
        "discounttype": this.state.discounttype,
        "discountin": this.state.discountin,
        "discountvalue": this.state.discountvalue,
        "startdate"     : this.state.startdate,
        "enddate"       : this.state.enddatestartdate,
        "createdBy": localStorage.getItem("admin_ID")
      }
      console.log('formValues===>', formValues);
      axios.post('/api/discount/post', formValues)
        .then((response) => {
          swal({
            text: response.data.message,
          });
          this.setState({
            "discounttype": '',
            "discountin": '',
            "discountvalue": '',
            "startdate": '',
            "enddate": '',
          });
          this.getData(this.state.startRange, this.state.limitRange);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }else{
      swal({
        text: "Please Select Discount type or Discount In."
      });
    }
  }
  updateDiscount(event) {
    event.preventDefault();
    if ($('#OrderLevelDiscount').valid()) {
      var formValues = {
        "discountID":this.props.match.params.editId,
        "discounttype": this.state.discounttype,
        "discountin": this.state.discountin,
        "discountvalue": this.state.discountvalue,
        "startdate" : this.state.startdate,
        "enddate"   : this.state.enddate,
      }
      axios.patch('/api/discount/patch', formValues)
        .then((response) => {
          swal({
            text: response.data.message,
          });
          this.getData(this.state.startRange, this.state.limitRange);
          this.setState({
            "discounttype": '',
            "discountin": '',
            "discountvalue": '',
          });
          this.props.history.push('/discount-management');
        })
        .catch((error) => {
          console.log('error', error);
        });
    }

  }
  edit(id) {
    axios.get('/api/discount/get/one/' + id)
      .then((response) => {
        console.log('edit = ', response.data);
        if (response.data) {
          this.setState({
            "discounttype"  : response.data.discounttype,
            "discountin"    : response.data.discountin,
            "discountvalue" : response.data.discountvalue,
            "startdate"     : moment(response.data.startdate).format("YYYY-MM-DD"),
            "enddate"       : moment(response.data.enddate).format("YYYY-MM-DD"),
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <section className="content">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
            <div className="row">
              <div className="">
                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  <h4 className="NOpadding-right">Discount Management</h4>
                </div>
                <form id="OrderLevelDiscount" className="">
                  <div className="col-lg-6 fieldWrapper">
                    <label>Discount Type<i className="redFont">*</i></label>
                    <select onChange={this.setLimit.bind(this)} value={this.state.discounttype} id="discounttype" ref="discounttype" name="discounttype" className="col-lg-12 col-md-12 col-sm-6 col-xs-12  noPadding  form-control">
                      <option  name="No Select" >-- Select Discount Type --</option>
                      <option value="Order Base">Order Base</option>
                      <option value="Product Base">Product Base</option>                      
                    </select>
                  </div>
                  <div className="col-lg-6 fieldWrapper">
                    <label>Discount In<i className="redFont">*</i></label>
                    <select onChange={this.handleChange.bind(this)} value={this.state.discountin} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" ref="discountin" name="discountin" >
                      <option  name="No Select"  >-- Select Discount In --</option>
                      <option name="percent" value ="Percent" >Percent</option>
                      <option name="amount"  value ="Amount"  >Amount</option>
                    </select>
                  </div>
                  <div className="col-lg-6 fieldWrapper noPadding">
                    <div className="col-lg-12">
                      <label>Discount Value<i className="redFont">*</i></label>
                      <input value={this.state.discountvalue} name="discountvalue" id="discountvalue" onChange={this.handleChange.bind(this)} type="text" className="form-control edit-catg-new" placeholder="Discount Value Title" ref="discountvalue" />
                    </div>
                  </div>
                  <div className="col-lg-6 fieldWrapper noPadding">
                    <div className="col-lg-12">
                      <label>Start Date</label>
                      {/* <input type="date" onChange={this.handleChange.bind(this)} value={moment(this.state.startdate).format("DD-MM-YYYY")}  className="form-control edit-catg-new" name="startdate" id="startdate" ref="startdate" /> */}
                      <input type="date" id="startdate" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.startdate} ref="startdate" name="startdate" onChange={this.handleChange.bind(this)} />
                      
                    </div>
                  </div>

                  <div className="col-lg-6 fieldWrapper noPadding">
                    <div className="col-lg-12">
                      <label>End Date</label>
                      <input type="date" id="enddate" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.enddate} ref="enddate" name="enddate" onChange={this.handleChange.bind(this)} />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="col-lg-3  pull-right">
                      <label>&nbsp;</label>
                      {
                        this.props.match.params.editId ?
                          <button onClick={this.updateDiscount.bind(this)} className="col-lg-12 btn-primary btn ">Update</button>
                          :
                          <button onClick={this.submitDiscount.bind(this)} className=" col-lg-12 btn-primary btn ">Submit</button>
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
        </section>
      </div>
    );
  }
}

export default DiscountManagement;
