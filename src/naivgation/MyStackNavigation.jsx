import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import ShowWallpaperScreen from "../screen/ShowWallpaperScreen";
import CollectionScreen from "../screen/CollectionScreen";
import CollectionDetailsScreen from "../screen/CollectionDetailsScreen";
import SearchScreen from "../screen/SearchScreen";
import LikeScreen from "../screen/LikeScreen";

const Stack = createNativeStackNavigator();

export function HomeStack() {
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

export function CollectionStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="COLLECTION_SCREEN" component={CollectionScreen} />
      <Stack.Screen
        name="COLLECTION_DETAILS_SCREEN"
        component={CollectionDetailsScreen}
      />
      <Stack.Screen
        name="SHOW_WALLPAPER_SCREEN"
        component={ShowWallpaperScreen}
      />
    </Stack.Navigator>
  );
}

export function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SEARCH_SCREEN" component={SearchScreen} />

      <Stack.Screen
        name="SHOW_WALLPAPER_SCREEN"
        component={ShowWallpaperScreen}
      />
    </Stack.Navigator>
  );
}
export function LikeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LIKE_SCREEN" component={LikeScreen} />

      <Stack.Screen
        name="SHOW_WALLPAPER_SCREEN"
        component={ShowWallpaperScreen}
      />
    </Stack.Navigator>
  );
}
