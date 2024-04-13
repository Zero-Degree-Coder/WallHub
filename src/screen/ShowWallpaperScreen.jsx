import {
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDownloadFile } from "../hooks/useDownloadFile";
import Share from "react-native-share";
import ReactNativeBlobUtil from "react-native-blob-util";

const ShowWallpaperScreen = () => {
  const { downloadFile, percentage, downloading } = useDownloadFile();
  console.log("downloadFile: ", downloadFile);
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item;
  const handleBackPress = () => {
    navigation.goBack();
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
    }
  };
  const handleDownload = async () => {
    await downloadFile(item.image, item.name);
  };
  const handleShareImage = () => {
    try {
      ReactNativeBlobUtil.fetch("GET", item.image).then((res) => {
        let status = res.info().status;
        if (status === 200) {
          let base64Str = res.base64();
          let options = {
            url: `data:image/jpeg;base64,${base64Str}`,
          };
          Share.open(options)
            .then((r) => {
              console.log(r);
            })
            .catch((e) => {
              e && console.log(e);
            });
        }
      });
    } catch (error) {}
  };
  return (
    <>
      <StatusBar hidden />
      <ImageBackground
        source={{
          uri: item.image,
        }}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={handleBackPress}
        >
          <Ionicons name={"chevron-back"} color={"white"} size={30} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              handleLikeWallpaper(item);
            }}
          >
            <AntDesign name={"hearto"} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDownload(item)}>
            <Feather name={"download"} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShareImage}>
            <FontAwesome name={"share"} size={30} color="white" />
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
              <ActivityIndicator color={"white"} size={"50"} />
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
      </ImageBackground>
    </>
  );
};

export default ShowWallpaperScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121928",
  },
  backIconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#414753",
    borderRadius: 10,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    bottom: 200,
    right: 20,
    height: 150,
    justifyContent: "space-between",
  },
});
