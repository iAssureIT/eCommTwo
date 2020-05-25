import React, { Component }   from "react";
import {View,Text}            from "react-native";
import  HomeStack             from "./src/config/routes.js";
import  AuthStack             from "./src/config/routes.js";
import { createAppContainer } from 'react-navigation';
import axios                  from 'axios';
import codePush               from 'react-native-code-push';
import AsyncStorage           from '@react-native-community/async-storage';

const HomeStackContainer = createAppContainer(HomeStack);
const AuthStackContainer = createAppContainer(AuthStack);

axios.defaults.baseURL = 'http://qaunimandaiapi.iassureit.com/';
console.log("axios.defaults.baseURL",axios.defaults.baseURL);

// let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START};

class App extends Component {
  constructor(props) {
    super(props);
      this.state={
        user_id :"",
        token   :""
    }
  }

  render() {
    return( 
        <HomeStackContainer />
      );
  }
}

const codePushOptions = {
 checkFrequency: codePush.CheckFrequency.ON_APP_START 
};
export default codePush(codePushOptions)(App);