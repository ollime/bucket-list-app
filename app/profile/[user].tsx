import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { Container } from 'components/Container';
import Button from 'components/Button';
import { getPublicActivities } from 'api/activities-api';
import { useSession } from 'utils/AuthContext';
import { MinimizedActivity } from 'utils/activity.types';
import { BucketListItem } from 'components/BucketList';
import { FlashList } from '@shopify/flash-list';
import { getFriendStatus } from 'api/friends-api';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Profile() {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  const session = useSession();
  const [activities, setActivities] = useState<MinimizedActivity[] | undefined>();
  const [status, setStatus] = useState<string | undefined>('');

  useEffect(() => {
    async function getData() {
      await getPublicActivities(user as string, session ?? undefined)
        .then((res): any => {
          if (res) {
            // @ts-ignore
            delete res[0].profiles;
            return res;
          } else {
            return;
          }
        })
        .then((res) => {
          if (res) {
            setActivities(res ?? undefined);
          }
        });
    }
    async function getStatus() {
      setStatus(await getFriendStatus(user as string, session ?? undefined));
    }
    getData();
    getStatus();
  }, [user, session]);

  function handleReturnToSearch() {
    router.navigate('search');
  }

  return (
    <Container>
      <View className="flex-row items-center">
        <Text className={styles.title}>{user}</Text>
        {status === 'accepted' ? (
          <View className="ml-2 flex flex-row items-center">
            <MaterialIcons name="person" size={30} color="black" />
            <Text>Friends</Text>
          </View>
        ) : (
          ''
        )}
        <View className="flex-1"></View>
        <Button label="Return" callback={handleReturnToSearch}></Button>
      </View>
      <FlashList
        data={activities}
        renderItem={({ item }) => <BucketListItem data={item} user_id={user as string} />}
        contentContainerStyle={{ padding: 2 }}
        estimatedItemSize={16}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary mr-2',
};
