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
      const { data: users, error } = await supabase.from('profiles')
        .select(`id, username, avatar_url, 
          sent_friends:friends!friends_user_fkey (
            user,
            friend
          )`);
      if (error) {
        alert(error.message);
        return;
      }
      const formattedData: ListItemData[] = [];
      users.forEach(({ id, username, avatar_url }) => {
        formattedData.push({ title: username, avatarUrl: avatar_url });
      });
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
