import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
const imageUrl =
  "https://wallpapers.com/images/high/dark-trippy-rick-and-morty-05m8eqaoeolmuswo.webp";
const ImageCard = ({ item }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("SHOW_WALLPAPER_SCREEN", { item });
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
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name={"hearto"} size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name={"download"} size={30} color="white" />
        </TouchableOpacity>
      </View>
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
  },
  converImage: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    bottom: 12,
    right: 8,
    height: 80,
    justifyContent: "space-between",
  },
});
