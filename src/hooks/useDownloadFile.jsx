// check the permission do we have permission
// then, we will downoad the file in app directroy
// copy to medi direcroy

import { useState } from "react";
import ReactNativeBlobUtil from "react-native-blob-util";
import { requestWriteExternalStoragePermission } from "../utils/helper";
import { Alert } from "react-native";

export const useDownloadFile = () => {
  let dirs = ReactNativeBlobUtil.fs.dirs;
  const folderPath = dirs.DownloadDir + "/wallpapers";
  const [downloading, setDownloading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const downloadFile = async (url, fileName) => {
    if (!url) {
      return;
    }
    const isAllowed = await requestWriteExternalStoragePermission();
    if (!isAllowed) {
      Alert.alert(
        "Permission Required",
        "Please grant storage permission to download wallpapers"
      );
      return;
    }
    try {
      setDownloading(true);
      const res = await ReactNativeBlobUtil.config({
        path: `${folderPath}/${fileName}.png`,
        fileCache: true,
        appendExt: "png",
        addAndroidDownloads: {
          notification: true,
          title: "Great! Download Success!",
          description: "An image file",
          mediaScannable: true,
        },
      })
        .fetch("GET", url)
        .progress((received, total) => {
          const progressPercentage = Math.floor((received / total) * 100);
          setPercentage(progressPercentage);
        })
        .then(async (res) => {
          // android/wallpaers/download
          // download/yourImage
          let result = await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
            {
              name: fileName,
              parentFolder: "wallpapers",
              mimeType: "image/png",
            },
            "Download",
            res.path()
          );
          Alert.alert(
            "Wallpaper Downloaded",
            "Your wallpaper has been downloaded successfully",
            [
              {
                text: "Dismiss",
                style: "cancel",
              },
            ],
            { cancelable: true }
          );
        });
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloading,
    percentage,
    downloadFile,
  };
};
