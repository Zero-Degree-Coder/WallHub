import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
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
