import { useEffect } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import Modal from 'components/Modal';

export default function SearchModal() {
  useEffect(() => {
    // load more details
  }, []);
  const params = useLocalSearchParams();

  const confirmFriendRequest = () => {
    return;
  };

  return (
    <Modal onConfirm={confirmFriendRequest}>
      <Text>{params.activity}</Text>
    </Modal>
  );
}
