import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image, ListItem } from "react-native-elements";
import React, { useEffect, useState } from 'react';
import { BaseRouter } from '@react-navigation/native';
import { getEvents } from '../api/TMServer'

const EventsListScreen = ({ navigation }) => {

  const [events, setEvents] = useState([]);

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
          navigation.navigate("Video Viewer", item);
        }}>
        <ListItem key={index}>

          <Image 
            source={{ uri: item.images[0].url }}
            style={{ width: 100, height: 55 }}
          />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
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

