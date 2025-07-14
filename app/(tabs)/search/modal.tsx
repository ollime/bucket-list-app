import { Text } from 'react-native';
import Modal from 'components/Modal';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from 'utils/supabase';
import { useSession } from 'utils/context';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();

  async function getUsername() {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return data.username;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  const confirmFriendRequest = async () => {
    const data = { user: await getUsername(), friend: params.screenName, status: 'pending' };
    const { error } = await supabase.from('friends').insert(data);
    console.log(data);
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
