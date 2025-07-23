import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import Modal from 'components/Modal';
import TextField from 'components/TextField';
import { getActivityDetails } from 'api/activities-api';
import { useSession } from 'utils/AuthContext';
import { Activity } from 'utils/activity.types';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();
  const [data, setData] = useState<Activity>();

  useEffect(() => {
    async function retrieveData() {
      const activityDetails = (await getActivityDetails(
        params.activity as string,
        session ?? undefined
      )) as Activity;
      setData(activityDetails);
    }
    retrieveData();
  }, [session, params]);

  const saveActivityData = () => {
    // implement here
  };

  return (
    <Modal onConfirm={saveActivityData}>
      <View className="flex-1">
        <TextField
          label="Name"
          value={data?.activity ?? ''}
          onChangeText={() => {}}
          placeholder="activity name"></TextField>
        <TextField
          label="Description"
          value={data?.description ?? ''}
          onChangeText={() => {}}
          placeholder="description"
          multiline={true}></TextField>
        <Text>{data?.status}</Text>
        <Text>{data?.is_public}</Text>
        {/* <Text>{data?.created_at}</Text>
      <Text>{data?.planned_date}</Text>
      <Text>{data?.completed_date}</Text> */}
        <Text>{data?.location}</Text>
      </View>
    </Modal>
  );
}
