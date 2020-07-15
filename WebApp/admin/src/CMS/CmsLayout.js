import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import CircleMenuBars from './component/circlemenubars.js';
import Cmspage from './component/cmspage.js';
import ViewPage_1 from './component/createnewpage/ViewPage1.js';
import ViewPage_2 from './component/createnewpage/Viewpage.js';
import ViewBlock_1 from './component/createnewblock/viewblock1.js';
import ViewBlock_2 from './component/createnewblock/ViewBlock_2.js';
import ViewBlock_3 from './component/createnewblock/ViewBlock_3.js';
import MasterPage from './component/MasterPage/MasterPage.js';
// import Header from './component/common/Header/Header.js'; 
import CmsDashBoard from './CmsDashBoard/CmsDashBoard.js'; 

/*blogs*/
import Header from './component/coreAdminCommon/header/Header.js'; 

import SingleBlogPage                   from './component/Blogs/SingleBlogPage/SingleBlogPage.js';
// import AllBlog                          from './component/AllBlog/AllBlog.js';
// import Blogcomponents                   from './component/Blogcomponents/Blogcomponents.js';
// import AllBlogsList                     from '../allBlocks/AllBlogsList/AllBlogsList.js';

/*============================ /Blog==============================================*/

/*import Rightsidebar     from '../common/rightSidebar/Rightsidebar.js';*/
import BlogsFormPage    from "./component/Blogs/BlogsForm/BlogsFormPage.js";
import AllBlogs          from "./component/Blogs/AllBlogs/AllBlogs.js";
import JobForm          from "./component/JobApplication/JobApplication.js";


import Homepage          from "./component/Homepage/Homepage.js";

export default class CmsLayout extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
			<div className="App container-fluid" >
                <div className="row" >
                	<Header />
                	<div>
                	 <Switch >
                                                
                        <Route path="/cms/dashboard"                      exact strict component={CmsDashBoard}  />
                        <Route path="/cms/create-new-page"                exact strict component={ViewPage_1}  />
                        <Route path="/cms/new-page-add-block"             exact strict component={ViewPage_2}  />
                        <Route path="/cms/new-page-add-block/:id"         exact strict component={ViewPage_2}  />
                        <Route path="/cms/select-new-block"               exact strict component={ViewBlock_1}  />
                        <Route path="/cms/create-new-block"               exact strict component={ViewBlock_2}  />
                        <Route path="/cms/view-blocks"                    exact strict component={ViewBlock_3}  />
                        
    					<Route path="/cms/masterpage/:pageurl"       	  exact strict component={ MasterPage } /> 
     					
     					<Route path="/cms/singleblog" 					exact strict component={ SingleBlogPage }  />   
     					<Route path="/cms/blogs-form" 					exact strict component={ BlogsFormPage }  />   
     					<Route path="/cms/blogs-form/:blogURL" 			exact strict		component={ BlogsFormPage }  />   
     					<Route path="/cms/AllBlogs" 					exact strict component={ AllBlogs }  />   
     					<Route path="/cms/singleblog/:selectedUrl" 		exact strict			component={ SingleBlogPage }  />   
     					{/*<Route path="/cms/contact-us" 					component={ SingleBlogPage }  />   */}
     					{/*<Route path="/cms/job-application" 					component={ JobForm }  /> */}  
     					<Route path="/cms/homepage" 					exact strict component={ Homepage }  />   
                                                   
                		
                		</Switch>
                	</div>

				
				</div>
			</div>
			</Router>
		);
	}
}
