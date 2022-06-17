import { NavigationContainer } from "@react-navigation/native";
import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import EventsListScreen from "./screens/EventsListScreen";
import MapsViewerScreen from "./screens/MapsViewerScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from './screens/SignUpScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wishlist from "./screens/Wishlist";
import * as Analytics from "expo-firebase-analytics";

export default function App() {
  const Stack = createNativeStackNavigator();
  const navigationRef = useRef();
  const routeNameRef = useRef();
  return (
    <NavigationContainer
    ref={navigationRef}
    onReady={() =>
      (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
    }
    onStateChange={ async () => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      if (previousRouteName !== currentRouteName) {
        await Analytics.logEvent("screen_view", {
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
      }
      // Save the current route name for later comparison
      routeNameRef.current = currentRouteName;
    }}
    >
      <Stack.Navigator>
      <Stack.Screen name = "Login" component={LoginScreen}/>
        <Stack.Screen name = "SignUp" component={SignUpScreen}/>
        <Stack.Screen
          name="Event List"
          component={EventsListScreen}
          options={{ title: "Link Up" }}
        />
        <Stack.Screen name="Map Viewer"  component={MapsViewerScreen} />
     <Stack.Screen name="Wishlist"  component={Wishlist} />
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
