import { Text } from 'react-native';
import Modal from 'components/Modal';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from 'utils/supabase';
import { useSession } from 'utils/context';
import { getUsername } from 'utils/api';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();

  const confirmUnfriendUser = async () => {
    // write code to unfriend
    return;
  };

  return (
    <Modal onConfirm={confirmUnfriendUser}>
      <Text>
        Are you sure you want to unfriend
        <Text className="font-bold"> {params.screenName}</Text>
      </Text>
    </Modal>
  );
}
