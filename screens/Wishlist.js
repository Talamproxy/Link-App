import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image, ListItem } from "react-native-elements";
import React, { useEffect, useState } from 'react';
import { BaseRouter } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { auth,setupEventsListener,initEventsDB,deleteEvent } from '../fb-config/fb-credentials';

const Wishlist = ({ navigation }) => {

  const [savedevents, setsavedEvents] = useState([]);

  // const email="talam@gmail.com";
  const email=auth.currentUser?.email;

  useEffect(()=>{

    setupEventsListener((events)=>{
        setsavedEvents(events);
    });
},[]);


const data = savedevents.filter(function(item){
  return item.email == email;});

  // console.log("Filtered Data", data);

  const renderEvents = ( { index, item}) => {
    // console.log("Filtered Data", data);
    return (
        
        <ListItem >

        <Image 
            source={{ uri: item.image }}
            style={{ width: 100, height: 55 }}
          />
          <ListItem.Content>
            <ListItem.Title>{item.eventname}</ListItem.Title>
            <ListItem.Subtitle>{item.location}</ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity
           onPress={()=>{
            deleteEvent(item);
            Toast.show(`Event Removed`, {duration:Toast.durations.SHORT,animation: true, hideOnPress: true,})
          }}
          >
          <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
        </ListItem>
      
    );
  }

  return (
    <View>
      <FlatList
       data={data}
       renderItem={renderEvents}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
  },
});



export default Wishlist;

