import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image, ListItem } from "react-native-elements";
import React, { useEffect, useState } from 'react';
import { BaseRouter } from '@react-navigation/native';
import { getEvents } from '../api/TMServer'
import { auth } from '../fb-config/fb-credentials';
import { MaterialIcons } from '@expo/vector-icons';

const EventsListScreen = ({ navigation }) => {

  const [events, setEvents] = useState([]);
  const email="sapna@gmail.com";
  // const email=auth.currentUser?.email;

  useEffect(()=>{
    navigation.setOptions({
    headerRight:()=>(
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate("Wishlist");
            
        }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MaterialIcons name="favorite" size={30} color="red" /> <Text>Wishlist</Text></View>

        </TouchableOpacity>
        ),
        // headerLeft:()=>(
        //     <TouchableOpacity
        //     onPress={()=>{
        //         if(display==="All"){
        //             setDisplay("Not Done");
        //         } else if(display==="Not Done"){
        //             setDisplay("Done");
        //         } else{
        //             setDisplay("All");
        //         }
                
        //     }}>
        //        <Text style={styles.buttonStyle}>{display}</Text>
        //     </TouchableOpacity>
        //     ),

    });

});

  useEffect(() => {
    getEvents((data) => {
      // console.log("received: ", data._embedded.events);
      setEvents(data._embedded.events);
      // setVideos(data["_"]);
      
      // console.log()
      // data._embedded.events[0].name
    });
  }, []);

  const renderEvents = ( { index, item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("This is embedded", item._embedded.venues[0].name)
          navigation.navigate("Map Viewer", item); 
        }}>
        <ListItem key={index}>

          <Image 
            source={{ uri: item.images[0].url }}
            style={{ width: 100, height: 55 }}
          />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item._embedded.venues[0].name}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <FlatList
        data={events}
        extraData={events}
        keyExtractor={(item)=> item.id}
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



export default EventsListScreen;

