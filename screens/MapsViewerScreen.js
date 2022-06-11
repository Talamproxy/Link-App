import { StyleSheet, View, Text } from "react-native";
import MapView ,{ PROVIDER_GOOGLE } from "react-native-maps";

import React from "react";
import { WebView } from "react-native-webview";

const MapsViewerScreen = ({ route }) => {


  console.log("Longitude is: ", route.params._embedded.venues[0].location.longitude);
  var longitude=route.params._embedded.venues[0].location.longitude;
  var latitude=route.params._embedded.venues[0].location.latitude;
  var latitudeInt=parseInt(latitude);
  var longitudeInt=parseInt(longitude);
  return (
    <View style={styles.screen}>
      <View style={styles.map}>
        <MapView
      style={{height:'100%', width:'100%',}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}  
    initialRegion={{
      latitude:42.9624,
      longitude:-85.6716,
      latitudeDelta: 0.01,
    longitudeDelta: 0.01,
      
    }}
  />
      </View>
      <View style={styles.details}>
        <Text>Event Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex:7,
    backgroundColor:'#a0abff',
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    justifyContent:"center",
    alignItems:"center"
    
  },
  details:{
    flex:6,
  },
});


export default MapsViewerScreen;
