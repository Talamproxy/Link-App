import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView ,{ PROVIDER_GOOGLE } from "react-native-maps";
import { Image, ListItem } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { auth,initEventsDB,  storeEventsItem } from '../fb-config/fb-credentials';


import React, {useEffect, useState} from "react";
import { WebView } from "react-native-webview";

const MapsViewerScreen = ({ route }) => {

  // const email="sapna@gmail.com";
  const email=auth.currentUser?.email; 

  const [state, setState]= useState({eventname:route.params.name,location:route.params._embedded.venues[0].name, image:route.params.images[0].url,email:email});

  useEffect(()=>{
    try{
        initEventsDB();
    }catch(error){
        console.log(error);
    }
}, [])

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
      <ListItem style={{ padding:10}}>

<ListItem.Content >
<ListItem.Title>Event Details</ListItem.Title>
<Image 
  source={{ uri: route.params.images[0].url }}
  style={{ width: 100, height: 55, alignContent:"center", justifyContent:"center" }}
/>
  <ListItem.Title>Title: {route.params.name}</ListItem.Title>
  <ListItem.Subtitle>{route.params._embedded.venues[0].name}</ListItem.Subtitle>
</ListItem.Content>
</ListItem>
<View  style={styles.save}>
<TouchableOpacity
            onPress={()=>{
                storeEventsItem(state);
                Toast.show(`${route.params.name} has been Saved`, {duration:Toast.durations.SHORT,animation: true, hideOnPress: true,})
            }} >
                <MaterialIcons name="favorite" size={30} color="red" />
            </TouchableOpacity></View>
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
    backgroundColor:'#6495ED',
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    justifyContent:"center",
    alignItems:"center",
    padding:7,
    
  },
  save:{
   flexDirection:"row-reverse",
   marginStart:30,
  },
  details:{
    flex:6,
  },
});


export default MapsViewerScreen;
