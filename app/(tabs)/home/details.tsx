import { useEffect } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import Modal from 'components/Modal';

export default function SearchModal() {
  useEffect(() => {
    // load more details
  }, []);
  const params = useLocalSearchParams();

  const saveActivityData = () => {
    // implement here
  };

  return (
    <Modal onConfirm={saveActivityData}>
      <Text>{params.activity}</Text>
    </Modal>
  );
}
