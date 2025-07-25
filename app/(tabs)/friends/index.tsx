import { useEffect, useState } from 'react';

import { ProfileData, ProfileWithoutFriend } from 'utils/profile.types';
import { useSession } from 'utils/AuthContext';
import { getFriendsProfile } from 'api/friends-api';
import { getUsername } from 'api/profiles-api';

import { Container } from 'components/Container';
import ProfileList from 'components/ProfileList';

export default function Friends() {
  const [data, setData] = useState<ProfileData[]>([]);
  const session = useSession();

  useEffect(() => {
    async function getData() {
      const data = await getFriendsProfile(session ?? undefined);
      const formattedData: ProfileData[] = [];
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
      return formattedData;
    }
    getData().then(setData);
  }, [session]);

  return (
    <>
      <Container>
        <ProfileList data={data}></ProfileList>
      </Container>
    </>
  );
}
