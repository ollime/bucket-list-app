import { useEffect, useState, useRef, useCallback } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';

import { addNewActivity, getAllActivities } from 'api/activities-api';
import { MinimizedActivity, Activity } from 'utils/activity.types';
import { useSession } from 'utils/AuthContext';
import { useTheme } from 'utils/ThemeContext';

import Container from 'components/Container';
import BucketList from 'components/BucketList';
import Button from 'components/Button';
import CastlesOverlay from 'components/CastlesOverlay';

export default function Home() {
  const session = useSession();
  const theme = useTheme();
  const [data, setData] = useState<MinimizedActivity[]>();
  const [refreshing, setRefreshing] = useState(false);
  const listRef = useRef<any>(null);
  const [numOfCompleted, setNumOfCompleted] = useState<number>(0);
  const [overlayAllowed, setOverlayAllowed] = useState(true);

  const getData = useCallback(async () => {
    if (session) {
      const activities = await getAllActivities(session);
      setData(activities);
      if (activities) {
        setNumOfCompleted(activities.filter((item) => item.is_complete === true).length);
      }
    }
    if (theme) {
      setOverlayAllowed(theme.overlayAllowed ?? true);
    }
  }, [session, theme]);

  useEffect(() => {
    getData();
  }, [getData]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData])
  );

  function onRefresh() {
    listRef.current.scrollToOffset({ animated: true });
    setRefreshing(true);
    getData().then(() => {
      setRefreshing(false);
    });
  }

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
    setTimeout(() => {
      listRef.current.scrollToEnd({ animated: true });
    }, 0);
  }

  return (
    <Container>
      {overlayAllowed ? <CastlesOverlay numOfCastles={numOfCompleted}></CastlesOverlay> : ''}
      <View className="flex w-full flex-row items-center">
        <Text className={styles.title}>Bucket List</Text>
        <View className="flex-1"></View>
        <TouchableWithoutFeedback onPress={onRefresh}>
          <MaterialIcons name="refresh" size={36} color="black" className="m-2" />
        </TouchableWithoutFeedback>
        <Button
          label={
            <View className="flex flex-row items-center">
              <MaterialIcons name="add" size={24} color="black" />
              <Text className="pl-2">Add new activity</Text>
            </View>
          }
          callback={handleAddItem}></Button>
      </View>

      <BucketList
        data={data}
        user_id={session?.user.id ?? ''}
        ref={listRef}
        onRefresh={onRefresh}
        refreshing={refreshing}></BucketList>
    </Container>
  );
}

function ActivitiesNotFound() {
  return (
    <View className={styles.container}>
      <Image
        source={require('assets/error-page/otter-alarm.png')}
        style={{ height: 250, width: 200 }}
        contentFit="contain"></Image>
      <View className={`m-2 ${styles.title}`}>Add your first bucket list item!</View>
    </View>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
  container: 'flex flex-1 items-center justify-center m-6',
};
