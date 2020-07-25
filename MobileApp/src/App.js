import React, { Component } from "react";
import HomeStack from "./config/routes.js";
import AuthStack  from "./config/routes.js";
import SplashScreen from 'react-native-splash-screen';
import codePush               from 'react-native-code-push';
// import axios                from './config/axios.js';
import { createAppContainer } from 'react-navigation';
const HomeStackContainer = createAppContainer(HomeStack);
const AuthStackContainer = createAppContainer(AuthStack);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      setTimeout(() => {
      SplashScreen.hide();
    }, 1000)
  }

  render() {
    return (
      <HomeStackContainer />
      
    );
  }
}
// App.propTypes = {
//   status    : PropTypes.object,
//   user      : PropTypes.object,
//   loggingIn : PropTypes.bool
// };


const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START 
 };
 export default codePush(codePushOptions)(App);