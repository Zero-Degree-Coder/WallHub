import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import data from "../data/images.json";
import ImageCard from "../components/ImageCard";
import { api } from "../utils/api";

const CollectionDetailsScreen = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item;

  const handleBackPress = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if (item?._id) {
      getAllWallpapers();
    }
  }, [page]);

  const getAllWallpapers = async () => {
    try {
      const response = await api.get("/api/wallpapers", {
        params: {
          categoryId: item._id,
          page,
        },
      });
      const newWallpapers = response?.data?.wallpapers || [];
      if (newWallpapers.length) {
        setWallpapers([...wallpapers, ...newWallpapers]);
      }
      if (newWallpapers.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const fetchMoreWallpapers = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={handleBackPress}
      >
        <Ionicons name={"chevron-back"} color={"white"} size={30} />
      </TouchableOpacity>
      <View>
        <Text style={styles.header}>{item.name}</Text>
        <Text style={styles.subHeader}>
          Unlimited listed wallpapers from {item.name} collection.
        </Text>
      </View>
      <FlatList
        data={wallpapers}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} />
        )}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMoreWallpapers}
      />
    </View>
  );
};

export default CollectionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121928",
    padding: 20,
  },
  subHeader: {
    color: "#cccc",
    fontSize: 15,
  },
  backIconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#414753",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    marginVertical: 10,
  },
});
