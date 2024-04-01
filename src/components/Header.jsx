import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
// icons
import Feather from "react-native-vector-icons/Feather";
const Header = () => {
  return (
    <View style={styles.container}>
      <Feather name={"menu"} color={"white"} size={30} />
      <Image source={require("../assets/logo.png")} style={styles.appLogo} />
      <Feather name={"bell"} color={"white"} size={30} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    elevation: 10,
  },
  appLogo: {
    height: 60,
    width: 60,
  },
});
