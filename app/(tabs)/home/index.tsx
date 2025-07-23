import { useState } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { MinimizedActivity } from 'utils/activity.types';
import { Container } from 'components/Container';
import BucketList from 'components/BucketList';
import Button from 'components/Button';

export default function Home() {
  const testData: MinimizedActivity = {
    activity: 'Test',
    description: 'This is a test activity',
    status: 'complete',
  };
  const [data, setData] = useState<MinimizedActivity[]>([testData]);

  const emptyActivity: MinimizedActivity = {
    activity: 'New activity',
    description: '',
    status: 'incomplete',
  };

  function handleAddItem() {
    // db logic
    setData([...data, emptyActivity]);
  }

  return (
    <Container>
      <View className="flex w-full flex-row items-center">
        <Text className={styles.title}>Activities</Text>
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
      <BucketList data={data}></BucketList>
    </Container>
  );
}

const styles = {
  title: 'text-3xl font-bold text-secondary',
};
