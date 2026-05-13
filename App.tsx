import "react-native-gesture-handler"; // Must be first import
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { 
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold
} from "@expo-google-fonts/montserrat";
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppProviders from "./src/core/providers/AppProviders";
import RootNavigator from "./src/app/navigation/RootNavigator";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Montserrat-Regular": Montserrat_400Regular,
    "Montserrat-Medium": Montserrat_500Medium,
    "Montserrat-SemiBold": Montserrat_600SemiBold,
    "Montserrat-Bold": Montserrat_700Bold,
    ...MaterialCommunityIcons.font,
  });

  // If fonts failed to load or there's an error, we still want to show the app on web
  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#293489" />
      </View>
    );
  }

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
