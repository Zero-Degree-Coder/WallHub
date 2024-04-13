import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";
import data from "../data/images.json";
import { api } from "../utils/api";
const HomeScreen = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllWallpapers();
  }, [page]);

  const getAllWallpapers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/wallpapers", {
        params: {
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const fetchMoreWallpapers = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={wallpapers}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} />
        )}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 300,
        }}
        ListFooterComponent={
          <>
            {isLoading && (
              <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size={"large"} color={"white"} />
              </View>
            )}
          </>
        }
        onEndReachedThreshold={0.5}
        onEndReached={fetchMoreWallpapers}
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
