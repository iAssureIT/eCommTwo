import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import { withRouter }       from 'react-router-dom';
import _                    from 'underscore';

import 'bootstrap/js/tab.js';
var apiLink = "";
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "user_ID"   : "",
            "startRange": 0,
            "limitRange": 10,
            "editId"    :  '',
            "fieldValue" : ""
        };
    }

    render() {
        return (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                    <section className="content">
                        <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"backgroundImage" : `url("/images/Dashboard1.png")`, "backgroundSize": "100% 100%"}}>
                        
                        </div>
                    </section>
                </div>

        );
    }
}
export default withRouter(Dashboard)


