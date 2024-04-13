import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import data from "../data/images.json";
import ImageCard from "../components/ImageCard";
import { api } from "../utils/api";
import { useDebouncedCallback } from "use-debounce";
const SearchScreen = () => {
  // first we render some images when user search
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getAllWallpapers();
  }, [page]);

  const getAllWallpapers = async (searchValue) => {
    setIsLoading(true);
    const response = await api.get("/api/wallpapers", {
      params: {
        page,
        searchValue,
      },
    });
    const newWallpapers = response?.data?.wallpapers || [];

    if (newWallpapers.length) {
      if (page === 1) {
        setWallpapers(newWallpapers);
      } else {
        setWallpapers((prev) => [...prev, ...newWallpapers]);
      }
    }

    if (newWallpapers.length < 10) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setIsLoading(false);
  };
  const fetchMoreWallpapers = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const debounced = useDebouncedCallback((value) => {
    setSearchValue(value);
    setPage(1);
    getAllWallpapers(value);
  }, 500);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Search</Text>
          <Text style={styles.subHeader}>
            searching through hundred of photos will be so much easir now
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <EvilIcons name={"close"} color={"white"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      {/* input container alogn with icon */}
      <View style={styles.inputContainer}>
        <AntDesign name={"search1"} color={"#A0A3A9"} size={25} />
        <TextInput
          style={styles.textInput}
          placeholder="Search here.."
          placeholderTextColor={"#A0A3A9"}
          onChangeText={(value) => {
            debounced(value);
          }}
        />
      </View>

      {/* render some data */}
      <FlatList
        data={wallpapers}
        renderItem={({ item, index }) => {
          return <ImageCard item={item} index={index} />;
        }}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMoreWallpapers}
        ListFooterComponent={
          isLoading && (
            <View
              style={{
                paddingVertical: 20,
              }}
            >
              <ActivityIndicator size={"large"} color={"white"} />
            </View>
          )
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121928",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "80%",
  },
  header: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
  },
  subHeader: {
    color: "white",
    fontSize: 15,
    fontWeight: "400",
  },
  iconButton: {
    backgroundColor: "#414753",
    height: 40,
    width: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    height: 50,
    borderWidth: 2,
    borderColor: "#887EF9",
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    color: "white",
    marginLeft: 10,
  },
});
