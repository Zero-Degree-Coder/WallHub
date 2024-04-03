import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import data from "../data/images.json";
import ImageCard from "../components/ImageCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LikeComponent = () => {
  const navigation = useNavigation();
  const [wallpapers, setWallpapers] = useState([]);
  useEffect(() => {
    getWallpapersFromAsyncStorage();
  }, []);
  const getWallpapersFromAsyncStorage = async () => {
    let images = await AsyncStorage.getItem("images");
    images = images ? JSON.parse(images) : [];
    setWallpapers(images);
  };
  const handleNavigate = () => {
    navigation.navigate("HOME_SCREEN");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={handleNavigate}
      >
        <Ionicons name={"chevron-back"} color={"white"} size={30} />
      </TouchableOpacity>
      <View>
        <Text style={styles.header}>Faviorates</Text>
        <Text style={styles.subHeader}>
          You've marked all of these as faviorates
        </Text>
      </View>
      <FlatList
        data={wallpapers}
        renderItem={({ item, index }) => {
          return <ImageCard item={item} index={index} />;
        }}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 500,
        }}
      />
    </View>
  );
};

const LikeScreen = () => {
  const isFocused = useIsFocused();
  return isFocused ? <LikeComponent /> : null;
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121928",
    paddingHorizontal: 20,
  },
  backIconContainer: {
    backgroundColor: "#414753",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10,
  },
  header: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  },
  subHeader: {
    color: "white",
  },
});
