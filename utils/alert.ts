import { Alert, Platform } from 'react-native';

export function alert(content: string) {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    Alert.alert(content);
  } else {
    alert(content);
  }
}
