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

export default function Profile() {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  const session = useSession();
  const [activities, setActivities] = useState<MinimizedActivity[] | undefined>();

  useEffect(() => {
    async function getData() {
      await getPublicActivities(user as string, session ?? undefined)
        .then((res): any => {
          // @ts-ignore
          delete res[0].profiles;
          return res;
        })
        .then((res) => {
          if (res) {
            setActivities(res ?? undefined);
          }
        });
    }

    getData();
  }, [user, session]);

  function handleReturnToSearch() {
    router.navigate('search');
  }

  return (
    <Container>
      <View className="flex-row">
        <Text className={styles.title}>{user}</Text>
        <View className="flex-1"></View>
        <Button label="Return" callback={handleReturnToSearch}></Button>
      </View>
      <FlashList
        data={activities}
        renderItem={({ item }) => <BucketListItem data={item} user_id={user} />}
        contentContainerStyle={{ padding: 2 }}
        estimatedItemSize={16}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
};
