import { useEffect, useState, useRef } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { MinimizedActivity, Activity } from 'utils/activity.types';
import { Container } from 'components/Container';
import BucketList from 'components/BucketList';
import Button from 'components/Button';
import { addNewActivity, getAllActivities } from 'api/activities-api';
import { useSession } from 'utils/AuthContext';

export default function Home() {
  const session = useSession();
  const [data, setData] = useState<MinimizedActivity[]>();
  const listRef = useRef<any>(null);

  useEffect(() => {
    async function getData() {
      if (session) {
        setData(await getAllActivities(session));
      }
    }
    getData();
  }, [session]);

  const emptyMinimized: MinimizedActivity = {
    activity: 'New activity',
    description: '',
    is_complete: false,
  };

  const emptyActivity: Activity = {
    user_id: session?.user.id ?? '',
    activity: 'New activity',
    created_at: new Date(Date.now()),
    description: '',
    is_complete: false,
    is_public: false,
    planned_date: new Date(Date.now()),
    completed_date: new Date(Date.now()),
    location: '',
  };

  function handleAddItem() {
    // does not add if already exists
    while (data?.find((item) => item.activity === emptyMinimized.activity)) {
      if (emptyMinimized.activity === 'New activity') {
        emptyMinimized.activity += ' *';
        emptyActivity.activity += ' *';
      }
      emptyMinimized.activity += '*';
      emptyActivity.activity += '*';
    }
    addNewActivity(emptyActivity, session ?? undefined);
    setData(data ? [...data, emptyMinimized] : [emptyMinimized]);
    listRef.current.scrollToEnd({ animated: true });
  }

  return (
    <Container>
      <View className="flex w-full flex-row items-center">
        <Text className={styles.title}>Bucket List</Text>
        <View className="flex-1"></View>
        <Button
          label={
            <View className="flex flex-row items-center">
              <MaterialIcons name="add" size={24} color="black" />
              <Text className="pl-2">Add new activity</Text>
            </View>
          }
          callback={handleAddItem}></Button>
      </View>
      <BucketList data={data} user_id={session?.user.id ?? ''} ref={listRef}></BucketList>
    </Container>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
};
