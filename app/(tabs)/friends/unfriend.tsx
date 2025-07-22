import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useSession } from 'utils/context';
import { deleteFriend } from 'api/friends-api';
import { getUsername } from 'api/profiles-api';

import Modal from 'components/Modal';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();

  const confirmUnfriendUser = async () => {
    const screenName =
      typeof params.screenName === 'string' ? params.screenName : params.screenName[0];
    deleteFriend(await getUsername(session ?? undefined), screenName);
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
