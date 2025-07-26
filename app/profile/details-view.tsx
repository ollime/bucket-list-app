import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

import { getActivityDetails, updateActivityDetails } from 'api/activities-api';

import { useSession } from 'utils/AuthContext';
import { Activity } from 'utils/activity.types';
import { showAlert } from 'utils/alert';

import Modal from 'components/Modal';
import TextField from 'components/TextField';
import StatusBadge from 'components/StatusBadge';
import Toggle from 'components/Toggle';
import DateDisplay from 'components/DateDisplay';

export default function SearchModal() {
  const session = useSession();
  const params = useLocalSearchParams();
  const [activity, setActivity] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [location, setLocation] = useState<string>();
  const [plannedDate, setPlannedDate] = useState<Date | null>(null);
  const [completedDate, setCompletedDate] = useState<Date | null>(null);
  // for displaying the changes not saved modal
  const [isSaved, setIsSaved] = useState<boolean>(true);

  useEffect(() => {
    if (!isSaved) {
      showAlert('Changes not saved', 'info', false);
    } else {
      Toast.hide();
    }
  }, [isSaved]);

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
      setPlannedDate(activityDetails?.planned_date ?? null);
      setCompletedDate(activityDetails?.completed_date ?? null);
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
        planned_date: plannedDate,
        completed_date: completedDate,
        location: location,
        user_id: session?.user.id,
      });
    }
    setIsSaved(true);
  };

  return (
    <Modal onConfirm={saveActivityData}>
      <View className="flex w-full flex-row items-center">
        <StatusBadge
          label={isComplete ? 'complete' : 'incomplete'}
          color={isComplete ? 'bg-primary' : 'bg-secondary'}></StatusBadge>
        <View className="flex-1"></View>
      </View>
      <View className="flex flex-1 items-center">
        <TextField
          label="Name"
          value={activity ?? ''}
          onChangeText={() => {}}
          placeholder="activity name"></TextField>
        <TextField
          label="Description"
          value={description ?? ''}
          onChangeText={() => {}}
          placeholder="description"
          multiline={true}></TextField>
        {/* <Text>{data?.created_at}</Text>
      <Text>{data?.planned_date}</Text>
      <Text>{data?.completed_date}</Text> */}
        <TextField
          label="Location"
          value={location ?? ''}
          onChangeText={() => {}}
          placeholder="location"></TextField>

        <DateDisplay label="Planned" data={plannedDate} callback={() => {}}></DateDisplay>
        <DateDisplay label="Completed" data={completedDate} callback={() => {}}></DateDisplay>

        <View className="flex items-center p-4">
          <Toggle
            value={isPublic}
            label="Public"
            icon={isPublic ? 'public' : 'public-off'}
            callback={() => {}}></Toggle>
          <Toggle
            value={isComplete}
            label="Complete activity"
            icon={isComplete ? 'check-box' : 'check-box-outline-blank'}
            callback={() => {}}></Toggle>
        </View>
      </View>
    </Modal>
  );
}
