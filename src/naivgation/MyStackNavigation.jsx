import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import ShowWallpaperScreen from "../screen/ShowWallpaperScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Stack.Screen
        name="SHOW_WALLPAPER_SCREEN"
        component={ShowWallpaperScreen}
      />
    </Stack.Navigator>
  );
}
