import { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import ProfileList, { ListItemData } from 'components/ProfileList';
import { supabase } from 'utils/supabase';
import SearchBar from 'components/SearchBar';
import { useSession } from 'utils/context';

export default function Friends() {
  const [data, setData] = useState<ListItemData[]>([]);
  const session = useSession();

  useEffect(() => {
    async function getUsername() {
      try {
        if (!session?.user) throw new Error('No user on the session!');

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`username`)
          .eq('id', session?.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          return data.username;
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }
    async function getFriends() {
      const { data, error } = await supabase
        .from('friends')
        .select('friend:friend(username, avatar_url)')
        .eq('user', await getUsername());

      if (error) {
        alert(error.message);
        return;
      }
      const formattedData: ListItemData[] = [];

      if (data) {
        for (let friend of data) {
          if ('username' in friend.friend && 'avatar_url' in friend.friend) {
            const { username, avatar_url } = friend.friend as {
              username: string;
              avatar_url: string;
            };
            formattedData.push({
              title: username,
              avatarUrl: avatar_url,
            });
          }
        }
      }
      setData(formattedData);
    }
    getFriends();
  }, [session]);

  return (
    <>
      <Container>
        <ProfileList data={data}></ProfileList>
      </Container>
    </>
  );
}
