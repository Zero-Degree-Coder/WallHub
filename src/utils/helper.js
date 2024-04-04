import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

export const requestWriteExternalStoragePermission = async () => {
  if (Number(Platform.Version) < 33) {
    return true;
  }
  //   ask permission 33
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Storage Permission',
      message: 'This app needs access to your storage to save wallpaper',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.DENIED) {
    Alert.alert(
      'Permission Required',
      'This app needs access to your storage to download wallpaper',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Ask Permission Again',
          onPress: () => requestWriteExternalStoragePermission(),
        },
      ],
    );
  }
  if (granted === PermissionsAndroid.PERMISSIONS.NEVER_ASK_AGAIN) {
    Alert.alert(
      'Permission Required',
      'Please enable storage permission in your device setting to download the wallpaper',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Setting',
          onPress: () => Linking.openSettings(),
        },
      ],
    );
  }
  if (granted === PermissionsAndroid.PERMISSIONS.GRANTED) {
    console.log('write storage permission granted');
    return true;
  }
};
