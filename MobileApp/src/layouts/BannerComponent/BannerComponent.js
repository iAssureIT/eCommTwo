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
import Carousel from 'react-native-banner-carousel';
import Loading from '../../layouts/Loading/Loading.js';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 230;
 
const images = [
  {
    imageSource : require("../../images/img1.jpg"),
  },
  {
    imageSource : require("../../images/img2.jpg"),
  
  },
  {
    imageSource : require("../../images/img3.jpg"),
 
  }
];

const window = Dimensions.get('window');

export default class BannerComponent extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  renderPage(image, index) {
        return (
            <View key={index}>
                <ImageBackground 
                  style={{ width:360, height: 230,}} 
                  source={image.imageSource}
                  // resizeMode={"contain"}
                >
                </ImageBackground>
            </View>
        );
    }

  render() {


    return (
     
        <View style={styles.bannerWrapper}>
            <Carousel
               autoplay
               autoplayTimeout={5000}
               loop
               index={0}
               pageSize={BannerWidth}
               >
              {images.map((image, index) => this.renderPage(image, index))}
            </Carousel>
        </View>
    
    );
  }
}
