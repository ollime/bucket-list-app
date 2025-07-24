import { useEffect, useState } from 'react';
import { Text, View, Switch } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Modal from 'components/Modal';
import TextField from 'components/TextField';
import { getActivityDetails, updateActivityDetails } from 'api/activities-api';
import { useSession } from 'utils/AuthContext';
import { Activity } from 'utils/activity.types';
import StatusBadge from 'components/StatusBadge';
import Toggle from 'components/Toggle';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();
  const [activity, setActivity] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [location, setLocation] = useState<string>();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    async function retrieveData() {
      // rename to data later
      const activityDetails = (await getActivityDetails(
        params.activity as string,
        session ?? undefined
      )) as Activity;
      setActivity(activityDetails?.activity);
      setDescription(activityDetails?.description);
      setIsComplete(activityDetails?.is_complete);
      setIsPublic(activityDetails?.is_public);
      setLocation(activityDetails?.location);
      setIsSaved(true);
    }
    retrieveData();
  }, [session, params.activity]);

  const saveActivityData = () => {
    if (
      typeof activity === 'string' &&
      typeof description === 'string' &&
      typeof location === 'string' &&
      session
    ) {
      updateActivityDetails({
        activity: activity,
        description: description,
        is_public: isPublic ? 'true' : 'false',
        planned_date: plannedDate ? plannedDate : new Date(),
        completed_date: completedDate ? completedDate : new Date(),
        location: location,
        user_id: session?.user.id,
      });
    }
    setIsSaved(true);
  };

  const handleTogglePublic = () => {
    setIsPublic((previousState) => !previousState);
    setIsSaved(false);
  };
  const handleToggleComplete = () => {
    setIsComplete((previousState) => !previousState);
    setIsSaved(false);
  };
  const handleChangeLocation = (value: string) => {
    setLocation(value);
    setIsSaved(false);
  };
  const handleChangeActivity = (value: string) => {
    setActivity(value);
    setIsSaved(false);
  };
  const handleChangeDescription = (value: string) => {
    setDescription(value);
    setIsSaved(false);
  };

  return (
    <Modal onConfirm={saveActivityData}>
      <View></View>
      <StatusBadge
        label={isComplete ? 'complete' : 'incomplete'}
        color={isComplete ? 'bg-primary' : 'bg-secondary'}></StatusBadge>
      <View className="flex flex-1 items-center justify-evenly">
        <TextField
          label="Name"
          value={activity ?? ''}
          onChangeText={handleChangeActivity}
          placeholder="activity name"></TextField>
        <TextField
          label="Description"
          value={description ?? ''}
          onChangeText={handleChangeDescription}
          placeholder="description"
          multiline={true}></TextField>
        {/* <Text>{data?.created_at}</Text>
      <Text>{data?.planned_date}</Text>
      <Text>{data?.completed_date}</Text> */}
        <TextField
          label="Location"
          value={location ?? ''}
          onChangeText={handleChangeLocation}
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
