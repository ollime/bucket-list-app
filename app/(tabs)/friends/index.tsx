import { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ProfileData, ProfileWithoutFriend } from 'utils/profile.types';
import { useSession } from 'utils/AuthContext';
import { getFriendsProfile } from 'api/friends-api';
import { getUsername } from 'api/profiles-api';

import { Container } from 'components/Container';
import ProfileList from 'components/ProfileList';

export default function Friends() {
  const session = useSession();
  const [data, setData] = useState<ProfileData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const ref = useRef<any>(null);

  function onRefresh() {
    ref?.current.scrollToOffset({ animated: true });
    setRefreshing(true);
    getData()
      .then(setData)
      .then(() => {
        setRefreshing(false);
      });
  }

  const getData = useCallback(async () => {
    const formattedData: ProfileData[] = [];
    if (session) {
      const data = await getFriendsProfile(session ?? undefined);
      const username = await getUsername(session ?? undefined);
      if (data) {
        for (let friend of data) {
          const sender = friend.sender as unknown as ProfileWithoutFriend;
          const receiver = friend.receiver as unknown as ProfileWithoutFriend;
          const displayedUser = sender?.username === username ? receiver : sender;
          const isSender = sender?.username === username;
          if ('username' in displayedUser && 'avatar_url' in displayedUser) {
            const status =
              friend.status === 'pending' ? (isSender ? 'requested' : 'pending') : friend.status;
            const { username, avatar_url } = displayedUser as {
              username: string;
              avatar_url: string;
            };
            formattedData.push({
              username: username,
              avatarUrl: avatar_url,
              friendStatus: status,
            });
          }
        }
      }
    }
    return formattedData;
  }, [session]);

  useEffect(() => {
    getData().then(setData);
  }, [session, getData]);

  return (
    <>
      <Container>
        <View className="flex flex-row items-center">
          <Text className={styles.title}>Friends</Text>
          <View className="flex-1"></View>
          <TouchableWithoutFeedback onPress={onRefresh}>
            <MaterialIcons name="refresh" size={30} color="black" className="m-2" />
          </TouchableWithoutFeedback>
        </View>
        <ProfileList
          data={data}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ref={ref}></ProfileList>
      </Container>
    </>
  );
}

const styles = {
  title: 'text-3xl font-bold text-primary',
};
