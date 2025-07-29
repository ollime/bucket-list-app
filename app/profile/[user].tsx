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
import { Image } from 'expo-image';
import { ErrorBoundary } from 'components/ErrorBoundary';

export default function Profile() {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  const session = useSession();
  const [activities, setActivities] = useState<MinimizedActivity[] | undefined>();
  const [status, setStatus] = useState<string | undefined>('');
  const [isUserFound, setIsUserFound] = useState<boolean>();

  useEffect(() => {
    async function getData() {
      try {
        await getPublicActivities(user as string, session ?? undefined)
          .then((res): any => {
            if (!res || res.length === 0) {
              throw new Error('No user found');
            }

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

        setIsUserFound(true);
      } catch {
        return setIsUserFound(false);
      }
    }
    async function getStatus() {
      setStatus(await getFriendStatus(user as string, session ?? undefined));
    }

    if (session) {
      getStatus();
      getData();
    }
  }, [user, session, router]);

  function handleReturnToSearch() {
    router.navigate('search');
  }

  return (
    <Container>
      {isUserFound ? (
        <>
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
          <Text className={styles.subtitle}>Public bucket list items</Text>

          {activities === undefined || activities.length === 0 ? (
            <ActivitiesNotFound></ActivitiesNotFound>
          ) : (
            ''
          )}

          <FlashList
            data={activities}
            renderItem={({ item }) => <BucketListItem data={item} user_id={user as string} />}
            contentContainerStyle={{ padding: 2 }}
            estimatedItemSize={16}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <ErrorBoundary
          error={Error('No user found')}
          retry={async () => {
            router.replace('/friends');
          }}
          extraInfo={'User may not exist or be a private account'}></ErrorBoundary>
      )}
    </Container>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary mr-2',
  subtitle: 'text-2xl font-bold text-primary mr-2 mb-2',
  container: 'flex flex-1 items-center justify-center m-6',
};

function ActivitiesNotFound() {
  return (
    <View className={styles.container}>
      <Image
        source={require('assets/error-page/otter-cool.png')}
        // do not use > 180px for height. adjust the height value to change the size of the entire image
        style={{ height: 250, width: 200 }}
        contentFit="contain"></Image>
      <Text className={`${styles.title} m-2`}>No public activities</Text>
    </View>
  );
}
