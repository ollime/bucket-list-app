import { useEffect, useState } from 'react';
import { Text, View, Switch } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import Modal from 'components/Modal';
import TextField from 'components/TextField';
import { getActivityDetails } from 'api/activities-api';
import { useSession } from 'utils/AuthContext';
import { Activity } from 'utils/activity.types';
import StatusBadge from 'components/StatusBadge';
import Toggle from 'components/Toggle';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();
  const [data, setData] = useState<Activity>();
  const [activity, setActivity] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [location, setLocation] = useState<string>();

  useEffect(() => {
    async function retrieveData() {
      // rename to data later
      const activityDetails = (await getActivityDetails(
        params.activity as string,
        session ?? undefined
      )) as Activity;
      setData(activityDetails);
      setActivity(activityDetails?.activity);
      setDescription(activityDetails?.description);
      setIsComplete(activityDetails?.is_complete);
      setIsPublic(activityDetails?.is_public);
      setLocation(activityDetails?.location);
    }
    retrieveData();
  }, [session, params.activity]);

  const saveActivityData = () => {
    // implement here
  };

  const handleTogglePublic = () => setIsPublic((previousState) => !previousState);
  const handleToggleComplete = () => setIsComplete((previousState) => !previousState);

  return (
    <Modal onConfirm={saveActivityData}>
      <StatusBadge
        label={isComplete ? 'complete' : 'incomplete'}
        color={isComplete ? 'bg-primary' : 'bg-secondary'}></StatusBadge>
      <View className="flex flex-1 items-center">
        <TextField
          label="Name"
          value={activity ?? ''}
          onChangeText={(value: string) => setActivity(value)}
          placeholder="activity name"></TextField>
        <TextField
          label="Description"
          value={description ?? ''}
          onChangeText={(value: string) => {
            setDescription(value);
          }}
          placeholder="description"
          multiline={true}></TextField>
        {/* <Text>{data?.created_at}</Text>
      <Text>{data?.planned_date}</Text>
      <Text>{data?.completed_date}</Text> */}
        <TextField
          label="Location"
          value={location ?? ''}
          onChangeText={(value: string) => setLocation(value)}
          placeholder="location"></TextField>
        <Toggle
          value={isPublic}
          label="Public"
          icon={isPublic ? 'public' : 'public-off'}
          callback={handleTogglePublic}></Toggle>
        <Toggle
          value={isComplete}
          label="Complete activity"
          icon={isComplete ? 'check-box' : 'check-box-outline-blank'}
          callback={handleToggleComplete}></Toggle>
      </View>
    </Modal>
  );
}
