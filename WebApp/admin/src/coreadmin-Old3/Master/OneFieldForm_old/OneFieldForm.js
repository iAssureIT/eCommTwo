import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import IAssureTable         from '../../IAssureTable/IAssureTable.jsx';
import axios                from 'axios';
import swal                 from 'sweetalert';
import { withRouter }       from 'react-router-dom'
import _                    from 'underscore';

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
            "editId"    :  this.props.match.params ? this.props.match.params.fieldID : '',
        };
    }
    componentDidMount() {
        apiLink =  this.props.tableObjects.apiLink;
        const user_ID = localStorage.getItem("user_ID")
        console.log("user_ID----",user_ID);
        this.setState({
            user_ID : user_ID,
        })
        this.getData(this.state.startRange, this.state.limitRange);
         console.log(this.props.editId)
       var editId = this.props.match.params.fieldID;
        console.log("editId",editId);
        this.getDataCount();
        this.edit(editId);

        window.scrollTo(0, 0);
        $.validator.addMethod("regxA1", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Location Type should only contain letters & number.");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#vendorLocationType").validate({
            rules: {
                locationType: {
                    required: true,
                    regxA1: /^[A-Za-z_0-9][A-Za-z\d_ ]*$/,
                },
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") =="locationType") {
                    error.insertAfter("#locationType");
                }
            }
        });
    }
   
    componentWillReceiveProps(nextProps) {
        this.edit(nextProps.editId);
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var fieldName = this.props.fields.attributeName
        this.setState({
            fieldName : event.target.value
        },()=>{console.log("[name]: event.target.value",this.state.fieldName)});

    }
    submitType(event) {
        event.preventDefault();
        console.log("this.props.editId",this.props.editId)
        if(this.props.editId)
        {
            var formValues ={
                "fieldID"       : this.props.editId,
                "fieldValue"    : this.state.fieldName,
                "updatedBy"     : this.state.user_ID
            }
            
        if ($('#vendorLocationType').valid()) {
            axios.patch(apiLink+'/patch', formValues)
                .then((response) => {
                    this.setState({
                        fieldName: "",
                        editId: ""
                    },()=>{
                        if(!this.state.editId)
                        {
                            this.props.history.push(this.props.tableObjects.editUrl);
                        }
                    })
                    this.getData(this.state.startRange, this.state.limitRange);
                    swal(response.data.message);
                })
                .catch((error) => {
                    console.log("error",error)  
                })
        }
        }else
        {
            var formValues = {
                "fieldValue": this.state.fieldName,
                "createdBy" : this.state.user_ID
            }
            console.log("formValues of nwe",formValues);
         if ($('#vendorLocationType').valid()) {

            axios.post(apiLink+'post', formValues)
                .then((response) => {
                    swal(this.state.fieldName+" "+this.props.fields.title+" submitted sucessfully");
                    this.getData(this.state.startRange, this.state.limitRange);
                    this.setState({
                       fieldName: ""
                     })
                })
                .catch((error) => {
                    console.log("error",error)
                    
                })
         }

        }
      
    }
    updateType(event) {
        event.preventDefault();
            
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
                this.setState({
                    tableData: response.data
                })
                console.log("tableData",this.state.tableData);

            })
            .catch((error) => {
                console.log("error",error)
                
            });
    }
    edit(id) {
       
        var fieldName = this.props.fields.attributeName;
        axios.get(apiLink+'get/one/' + id)
            .then((response) => {
                console.log('response',response);
                console.log('response',response.data[fieldName]);
                if (response.data) {
                    this.setState({
                        "fieldValue": response.data[fieldName],
                    });
                }
            })
            .catch((error) => {
                
            });
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">{this.props.fields.title} Master</h4>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                                            <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="vendorLocationType" onSubmit={this.submitType.bind(this)} >
                                                <div className="form-margin col-lg-8 col-lg-offset-2 col-md-6 col-sm-12 col-xs-12 pdcls">
                                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">{this.props.fields.title} <i className="astrick">*</i></label>
                                                    <input type="text" id="locationType"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.fieldName} ref={this.props.fields.attributeName} name={this.props.fields.attributeName} onChange={this.handleChange.bind(this)} placeholder={this.props.fields.placeholder} required />
                                                </div>
                                                <br />
                                                <div className="form-margin col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                    {/* <button onClick={this.submitType.bind(this)} className="btn button3 pull-right">Submit</button>

                                                    {this.state.editId ?
                                                        <button onClick={this.updateType.bind(this)} className="btn button3 pull-right">Update</button>
                                                        :
                                                        <button onClick={this.submitType.bind(this)} className="btn button3 pull-right">Submit</button>
                                                    }*/}
                                                </div>
                                            </form>
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


