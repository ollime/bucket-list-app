import { Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { deleteActivity } from 'api/activities-api';
import { showAlert } from 'utils/alert';
import { useSession } from 'utils/AuthContext';
import Modal from 'components/Modal';

export default function ConfirmDelete() {
  const params = useLocalSearchParams();
  const session = useSession();
  const router = useRouter();

  const confirmDeleteActivity = async () => {
    if (params.activity) {
      deleteActivity(params.activity as string, session ?? undefined);
    } else {
      showAlert('Something went wrong.', 'error', true);
    }
    router.back();
  };

  return (
    <Modal onConfirm={confirmDeleteActivity}>
      <Text className="flex flex-1 items-center justify-center">
        Delete
        <Text className="font-bold"> {params.activity} </Text>
        from your activities?
      </Text>
    </Modal>
  );
}
