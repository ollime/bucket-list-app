import { Text } from 'react-native';
import Modal from 'components/Modal';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from 'utils/supabase';
import { useSession } from 'utils/context';
import { getUsername } from 'utils/api';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();

  const confirmFriendRequest = async () => {
    const data = {
      user: await getUsername(session ?? undefined),
      friend: params.screenName,
      status: 'pending',
    };
    const { error } = await supabase.from('friends').insert(data);
    if (error) {
      alert(error);
      return;
    }
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
