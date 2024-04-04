import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDownloadFile } from "../hooks/useDownloadFile";
const imageUrl =
  "https://wallpapers.com/images/high/dark-trippy-rick-and-morty-05m8eqaoeolmuswo.webp";
const ImageCard = ({ item }) => {
  const { downloadFile, downloading, percentage } = useDownloadFile();
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("SHOW_WALLPAPER_SCREEN", { item });
  };

  const handleLikeWallpaper = async (item) => {
    let likedWallpapers = await AsyncStorage.getItem("images");
    likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : [];
    let isExist = likedWallpapers.findIndex((image) => image.id === item.id);
    if (isExist < 0) {
      likedWallpapers = [item, ...likedWallpapers];
      await AsyncStorage.setItem("images", JSON.stringify(likedWallpapers));
      Alert.alert(
        "Added to Favorites",
        "Your wallpaper has been successfully added to your faviorates.",
        [
          {
            text: "Dismiss",
            style: "cancel",
          },
          {
            text: "View Favorites",
            onPress: () => {
              navigation.navigate("LIKE_STACK");
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Added to Favorites",
        "Your wallpaper has been successfully added to your faviorates.",
        [
          {
            text: "Dismiss",
            style: "cancel",
          },
          {
            text: "View Favorites",
            onPress: () => {
              navigation.navigate("LIKE_STACK");
            },
          },
        ]
      );
    }
  };

  const handleDownloadFile = async (item) => {
    await downloadFile(item.image, item.name);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleNavigate(item);
      }}
      style={styles.container}
    >
      <Image source={{ uri: item.image }} style={styles.converImage} />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            handleLikeWallpaper(item);
          }}
        >
          <AntDesign name={"hearto"} size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleDownloadFile(item);
          }}
        >
          <Feather name={"download"} size={30} color="white" />
        </TouchableOpacity>
      </View>
      {downloading ? (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <ActivityIndicator color={"white"} size={"large"} />
            <Text
              style={{
                color: "white",
              }}
            >
              Progress Percentage {percentage}%
            </Text>
          </View>
        </>
      ) : null}
    </TouchableOpacity>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "50%",
    backgroundColor: "pink",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 8,
    marginVertical: 10,
    resizeMode: "cover",
  },
  converImage: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    bottom: 20,
    right: 15,
    height: 80,
    justifyContent: "space-between",
  },
});
