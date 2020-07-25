import React             from 'react';
import axios             from 'axios';
import Routes 			 from './coreEngine/lib/Routes';
import './root.css';
import './App.css';
import $                    from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// console.log("process.env.REACT_APP_BASE_URL:",process.env.REACT_APP_BASE_URL);
// console.log("process.env.REACT_APP_PROJECT_NAME:",process.env.REACT_APP_PROJECT_NAME);

function App() {
	getPreferences();
  return (
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 App" id="PageContentWrapper">
	   <Routes />
    </div>
  );
}


function getPreferences(){
	//Get all preferences and store them in localstorage
	axios.get("/api/adminpreference/get")
	.then(preferences =>{
		var askpincodeToUser = preferences.data[0].askPincodeToUser;
		localStorage.setItem('preferences',askpincodeToUser);
		localStorage.setItem("websiteModel",preferences.data[0].websiteModel);      
		localStorage.setItem("showLoginAs",preferences.data[0].showLoginAs); 
		// localStorage.setItem('preferences', JSON.stringify(preferences));
	})
	.catch(error=>{
		console.log("Error in preferences = ", error);
	})

}



export default App;
 

