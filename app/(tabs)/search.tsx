import { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import ProfileList, { ListItemData } from 'components/ProfileList';
import { supabase } from 'utils/supabase';
import SearchBar from 'components/SearchBar';

export default function Search() {
  const [data, setData] = useState<ListItemData[]>([]);
  const [searchValue, setSearchValue] = useState('');

  async function getAllUsers() {
    const { data: users, error } = await supabase.from('profiles').select('*');
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

  useEffect(() => {
    getAllUsers();
  }, []);

  function onChangeText(value: string) {
    setSearchValue(value);
  }

  return (
    <>
      <Container>
        <SearchBar value={searchValue} callback={onChangeText}></SearchBar>
        <ProfileList data={data}></ProfileList>
      </Container>
    </>
  );
}
