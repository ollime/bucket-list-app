import { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import ProfileList from 'components/ProfileList';
import { useSession } from 'utils/context';
import { getUsername, getFriends } from 'utils/api';
import { ProfileData, ProfileWithoutFriend } from 'utils/Profile.types';

export default function Friends() {
  const [data, setData] = useState<ProfileData[]>([]);
  const session = useSession();

  useEffect(() => {
    async function getData() {
      const data = await getFriends(session ?? undefined);
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
