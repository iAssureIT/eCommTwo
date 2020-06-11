import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import IAssureTable             from '../../IAssureTable/IAssureTable.jsx';
import OneFieldForm             from '../OneFieldForm/OneFieldForm.js';

import _ from 'underscore';
import 'bootstrap/js/tab.js';

class VendorCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: "",
            "fields" : {
                    placeholder   : "Enter category name..",
                    title         : "Vehicle Category",
                    api           : "/api/vendorCategory/",
                    attributeName : "category",
                    hasImage      : true

                },
            "tableHeading": {
                category: "Category Name",
                iconUrl : "Icon",
                actions: 'Action',
            },
            "tableObjects": {
                deleteMethod: 'delete',
                apiLink: '/api/categorymaster/',
                paginationApply: false,
                searchApply: false,
                editUrl: '/category'
            },
            "startRange": 0,
            "limitRange": 10,
            "editId": this.props.match.params ? this.props.match.params.fieldID : ''
        };
    }
    componentDidMount() {
        var editId = this.props.match.params.fieldID;
       
        this.setState({
            editId: editId
        })
        var editId = this.props.match.params.fieldID;
        window.scrollTo(0, 0);
    }
     componentWillReceiveProps(nextProps) {
        var editId = nextProps.match.params.fieldID;
        if (nextProps.match.params.fieldID) {
            this.setState({
                editId: editId
            })
        }
    }

  
 
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <OneFieldForm fields={this.state.fields}
                              tableHeading={this.state.tableHeading}
                              tableObjects={this.state.tableObjects}
                              editId ={this.props.match.params.fieldID} />
            </div>
        );
    }
}
export default VendorCategory;

