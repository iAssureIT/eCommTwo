import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';

import ListOfEntities from '../../coreadmin/Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';

class ListOfEntitiesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillReceiveProps(nextProps) {
    
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ListOfEntities entity="franchise" />
            </div>
        );
    }
}
export default ListOfEntitiesPage;

