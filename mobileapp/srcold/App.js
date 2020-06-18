import React, { Component } from "react";
import PropTypes from "prop-types";
import HomeStack from "./config/routes.js";
import AuthStack  from "./config/routes.js";
import settings from "./config/settings.js";
import Footer from "../src/ScreenComponents/Footer/UniFooter.js";
import SplashScreen from 'react-native-splash-screen';
// import axios                from './config/axios.js';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Alert
} from 'react-native';
import { createAppContainer } from 'react-navigation';
const HomeStackContainer = createAppContainer(HomeStack);
const AuthStackContainer = createAppContainer(AuthStack);

export default class App extends Component {
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

