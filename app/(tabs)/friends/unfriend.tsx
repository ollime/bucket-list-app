import { Text } from 'react-native';
import Modal from 'components/Modal';
import { useLocalSearchParams } from 'expo-router';
import { useSession } from 'utils/context';
import { deleteFriend, getUsername } from 'utils/api';

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
