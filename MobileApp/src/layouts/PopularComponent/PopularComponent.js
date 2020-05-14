import React from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage,
  TextInput,
  Alert
} from 'react-native';
import styles from './styles.js';
import { colors, sizes } from '../../config/styles.js';
import ValidationComponent from "react-native-form-validator";
import Loading from '../../layouts/Loading/Loading.js';

const window = Dimensions.get('window');

export default class PopularComponent extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      poupularImgData:[
        {
          "popImage" : require("../../images/7.png"),
        },
        {
          "popImage" : require("../../images/8.png"),
        },
        {
          "popImage" : require("../../images/9.png"),
        },
        {
          "popImage" : require("../../images/10.png"),
        },
      ] 
    };
  }
  render() {
    return (
      <View style={{marginBottom:"15%"}}>
        <View>
          <Text style={styles.title}>Popular</Text> 
        </View>
        <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',}}>
          {this.state.poupularImgData.map((poupularImgData,i)=>{
            return(
              <TouchableOpacity key={i}>
                <View  style={[{borderWidth:1,borderColor:'#f1f1f1',backgroundColor:"f1f1f1",width:175,height:100,flexDirection:'row',marginBottom:10,borderRadius:10,},(i%2==0?{marginRight:10}:{})]}>
                  <Image
                    source={poupularImgData.popImage}
                    style={{ height:100,borderRadius:10,width:175}}
                  />
                </View>
              </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    );
  }
}
