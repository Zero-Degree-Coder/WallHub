import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import data from "../data/category.json";
import ImageCard from "../components/ImageCard";
import { api } from "../utils/api";

const CollectionScreen = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/categories");
      setCategories(response.data.categories);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.heading}>Collections</Text>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <CategoryCard item={item} index={index} />
        )}
        contentContainerStyle={{
          paddingBottom: 300,
        }}
      />
    </View>
  );
};

export default CollectionScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121928",
    paddingHorizontal: 20,
  },
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },
});
