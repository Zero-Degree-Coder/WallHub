import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ item, index }) => {
  const navigation = useNavigation();
  const handleNavigate = (item) => {
    navigation.navigate("COLLECTION_DETAILS_SCREEN", { item });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigate(item)}
    >
      <Image source={{ uri: item.image }} style={styles.coverImage} />
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  coverImage: {
    height: 120,
    width: "100%",
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },
  textContainer: {
    position: "absolute",
    bottom: 50,
    left: 40,
  },
});
