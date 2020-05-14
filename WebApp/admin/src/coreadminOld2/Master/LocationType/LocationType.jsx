import React, { Component }     from 'react';
import OneFieldForm             from '../OneFieldForm/OneFieldForm.js';
import _                        from 'underscore';
import 'bootstrap/js/tab.js';
import './LocationType.css'

class VendorLocationType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "locationType": "",
            "fields" : {
                placeholder     : "Enter location type..",
                title           : "Location Type",
                attributeName   : "locationType"
            },
            "tableHeading": {
                locationType: "Location Type",
                actions: 'Action',
            },
            "tableObjects": {
                deleteMethod: 'delete',
                apiLink: '/api/locationtypemaster/',
                paginationApply: false,
                searchApply: false,
                editUrl: '/location-type'
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
                              editId ={this.props.match.params.fieldID}
                              history={this.props.history} />
            </div>

        );
    }
}
export default VendorLocationType;

