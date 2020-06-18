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
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/BannerComponentStyles.js';
import { colors, sizes } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import ValidationComponent from "react-native-form-validator";
import Carousel from 'react-native-banner-carousel';
// import Loading from '../../../AppDesigns/currentApp/styles/ScreenComponentStyles/LoadingStyles.js';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 230;
 
const images = [
  {
    imageSource : require("../../AppDesigns/currentApp/images/img11.jpg"),
  },
  {
    imageSource : require("../../AppDesigns/currentApp/images/img22.jpeg"),
  
  },
  {
    imageSource : require("../../AppDesigns/currentApp/images/img33.jpeg"),
 
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
                  style={{ width:380, height: 230,}} 
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
