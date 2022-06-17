import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image, ListItem } from "react-native-elements";
import React, { useEffect, useState } from 'react';
import { BaseRouter } from '@react-navigation/native';
import { getEvents,getCitiesAPI } from '../api/TMServer'
import { auth } from '../fb-config/fb-credentials';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Toast from 'react-native-root-toast';
import DropDownPicker from 'react-native-dropdown-picker';

const EventsListScreen = ({ navigation }) => {

  const [events, setEvents] = useState([]);
  // const email="sapna@gmail.com";
  const email=auth.currentUser?.email;
  const signoutHandler=()=>{
    auth.signOut().then(()=>{
      navigation.navigate("Login");
      Toast.show(`Logged Out Successfully`, {duration:Toast.durations.SHORT,animation: true, hideOnPress: true,})
      // console.log("Logged in with: ",user.email)
    }).catch(error=>alert(error.message))
  }

  useEffect(()=>{
    navigation.setOptions({
    headerRight:()=>(
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate("Wishlist");
            
        }}>
 <MaterialIcons name="favorite" size={30} color="red" /> 
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
         <Text>Wishlist</Text></View>

        </TouchableOpacity>
        ),
        headerLeft:()=>(
            <TouchableOpacity
            onPress={()=>{
               
              signoutHandler();
            }}
            style={{marginRight:20}}>
          <SimpleLineIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
           ),

    });

});

const [open, setOpen] = useState(false);
const [cities, setCities] = useState([
  {label: 'Chicago', value: 'chicago'},
  {label: 'Atlanta', value: 'atlanta'},
  {label: 'Grand Rapids', value: 'grand%20rapids'},
  {label: 'New York', value: 'new%20york'},
  {label: 'Dallas', value: 'Dallas'},
  {label: 'Tampa', value: 'Tampa'},
  {label: 'Phoenix', value: 'Phoenix'},
  {label: 'Miami', value: 'Miami'},
  {label: 'Indianapolis', value: 'Indianapolis'},
  {label: 'Toledo', value: 'Toledo'},
  {label: 'Charlotte', value: 'Charlotte'},
  {label: 'Detroit', value: 'Detroit'},
  {label: 'Boston', value: 'Boston'},
  {label: 'Seattle', value: 'Seattle'},
  {label: 'Denver', value: 'Denver'},
  {label: 'Baltimore', value: 'Baltimore'},
  {label: 'Portland', value: 'Portland'},
  {label: 'Tulsa', value: 'Tulsa'},
  {label: 'Milwaukee', value: 'Milwaukee'},
  {label: 'Philadelphia', value: 'Philadelphia'},
]);

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
            <ListItem.Subtitle>Start Time: {item.dates.start.localTime}</ListItem.Subtitle>
            <ListItem.Subtitle>Date: {item.dates.start.localDate}</ListItem.Subtitle>
         
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={{ marginRight:10, marginLeft:10, marginTop:10, marginBottom:10}}>
      <DropDownPicker
        zIndex={2000}
        zIndexInverse={2000}
        open={open}
        setOpen={setOpen}
        items={cities}
        setItems={setCities}
        placeholder="Select a city"
        onSelectItem={selectitem=>{ getCitiesAPI((data) => {
         setEvents(data._embedded.events);
          },
          selectitem.value)}}
        />
</View>
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

