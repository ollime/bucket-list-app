import { Text } from 'react-native';
import Modal from 'components/Modal';
import { useLocalSearchParams } from 'expo-router';

export default function SearchModal() {
  const params = useLocalSearchParams();
  const confirmFriendRequest = () => {
    alert('Friend request sent');
  };

  return (
    <Modal onConfirm={confirmFriendRequest}>
      <Text>
        Send a friend request to
        <Text className="font-bold"> {params.screenName}</Text>
      </Text>
    </Modal>
  );
}
