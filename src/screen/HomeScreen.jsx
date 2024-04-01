import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";
import data from "../data/images.json";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} />
        )}
        numColumns={2}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121928",
    flex: 1,
    paddingHorizontal: 20,
  },
});
