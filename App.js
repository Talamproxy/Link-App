import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import EventsListScreen from "./screens/EventsListScreen";
import MapsViewerScreen from "./screens/MapsViewerScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from './screens/SignUpScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name = "Login" component={LoginScreen}/>
        <Stack.Screen name = "SignUp" component={SignUpScreen}/>
        <Stack.Screen
          name="Event List"
          component={EventsListScreen}
          options={{ title: "LinkApp" }}
        />
        <Stack.Screen name="Video Viewer" options={{headerShown:false}} component={MapsViewerScreen} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "stretch",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "column",
    flexWrap: "wrap",
  },
});
