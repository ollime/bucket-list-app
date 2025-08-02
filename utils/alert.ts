import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

type AlertType = 'success' | 'error' | 'info';

export function showAlert(
  content: string,
  type: AlertType,
  autoHide: boolean,
  additionalInfo?: string
) {
  Toast.show({
    type: type,
    text1: content,
    text2: additionalInfo,
    position: 'top',
    autoHide: autoHide,
    swipeable: true,
  });
}
