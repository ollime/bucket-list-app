import { Text } from 'react-native';
import Modal from 'components/Modal';
import { useLocalSearchParams } from 'expo-router';
import { useSession } from 'utils/context';
import { addFriend } from 'utils/api';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();

  const confirmFriendRequest = async () => {
    addFriend(params.screenName as string, session ?? undefined);
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
