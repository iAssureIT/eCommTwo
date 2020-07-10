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
  Button,
  TextInput,
  Alert
} from 'react-native';
// import styles from './styles.js';
import styles from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/FeatureProductComponentStyles.js';
import { colors, sizes } from '../../AppDesigns/currentApp/styles/CommonStyles.js';
import ValidationComponent from "react-native-form-validator";
// import Loading from '../../../AppDesigns/currentApp/styles/ScreenComponentStyles/LoadingStyles.js';


const window = Dimensions.get('window');

export default class FeatureProductComponent extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      productImg:[],
      newProducts: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      newProducts: nextProps.newProducts,
      type: nextProps.type
    })
  }

  componentDidMount(){
     this.setState({
        newProducts : this.props.newProducts,
        type        : this.props.type
    })
  }



  render() {
    return (
      <View style={{marginBottom:"15%"}}>
        <View>
          <Text style={styles.title}>Feature Products</Text> 
        </View>
        <View style={styles.featurelistwrap}>
          {
            this.state.newProducts && this.state.newProducts.length > 0 ?
              this.state.newProducts.map((item, i) => {
                // console.log("item feature===>",item);
                return(
                 <View  key={i}>
                  <View  style={[styles.featureprod,(i%2==0?{marginRight:10}:{})]}>
                    <TouchableOpacity  onPress={()=>this.props.navigate('SubCatCompView',{productID:item._id})}>
                        {/* <Image
                          source={{uri:item.productImage[0] ? item.productImage[0] : '../../AppDesigns/currentApp/images/notavailable.jpg'}}
                          style={styles.featureimg}
                        /> */}
                        {item.productImage.length> 0 ?
                            <Image
                              source={{ uri: item.productImage[0] }}
                              style={styles.featureimg}
                            />
                          :
                            <Image
                              source={require("../../AppDesigns/currentApp/images/notavailable.jpg")}
                              style={styles.featureimg}
                            />
                        }
                      <Text style={styles.featureprodname}>{item.productName}</Text>
                    </TouchableOpacity>
                    </View>
                    
                  </View>
                  
                 
                   )
                 })
               :
                null
              }
        </View>
      </View>
    );
  }
}
