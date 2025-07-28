import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useSession } from 'utils/AuthContext';
import { deleteFriend } from 'api/friends-api';

import Modal from 'components/Modal';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();

  const confirmUnfriendUser = async () => {
    const screenName =
      typeof params.screenName === 'string' ? params.screenName : params.screenName[0];
    deleteFriend(screenName, session ?? undefined);
    return;
  };

  return (
    <Modal onConfirm={confirmUnfriendUser}>
      <Text>
        Are you sure you want to unfriend
        <Text className="font-bold"> {params.screenName}</Text>?
      </Text>
    </Modal>
  );
}
