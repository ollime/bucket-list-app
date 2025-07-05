import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Container } from 'components/Container';
import ProfileList, { ListItemData } from 'components/ProfileList';
import { supabase } from 'utils/supabase';

export default function Home() {
  const [data, setData] = useState<ListItemData[]>([]);

  async function getAllUsers() {
    const { data: users, error } = await supabase.from('profiles').select('*');
    if (error) {
      alert(error.message);
      return;
    }

    console.log(users);

    const formattedData: ListItemData[] = [];
    users.forEach(({ id, username, avatar_url }) => {
      formattedData.push({ title: username, avatarUrl: avatar_url });
    });
    setData(formattedData);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Container>
        <Text>Hello</Text>
        <ProfileList data={data}></ProfileList>
      </Container>
    </>
  );
}
