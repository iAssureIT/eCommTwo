import React             from 'react';
import axios             from 'axios';
import Routes 			 from './coreEngine/lib/Routes';
import './root.css';
import './App.css';
import $                    from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

console.log("process.env.REACT_APP_BASE_URL:",process.env.REACT_APP_BASE_URL);
console.log("process.env.REACT_APP_PROJECT_NAME:",process.env.REACT_APP_PROJECT_NAME);

function App() {
  return (
    <div className="App">
	   <Routes />
    </div>
  );
}
export default App;
 