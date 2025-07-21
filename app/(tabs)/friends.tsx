import { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import ProfileList, { ListItemData } from 'components/ProfileList';
import { useSession } from 'utils/context';
import { getFriends } from 'utils/api';

export default function Friends() {
  const [data, setData] = useState<ListItemData[]>([]);
  const session = useSession();

  useEffect(() => {
    async function getData() {
      const data = await getFriends(session ?? undefined);
      const formattedData: ListItemData[] = [];
      if (data) {
        for (let friend of data) {
          if ('username' in friend.friend && 'avatar_url' in friend.friend) {
            const status = friend.status;
            const { username, avatar_url } = friend.friend as {
              username: string;
              avatar_url: string;
            };
            formattedData.push({
              title: username,
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
