import { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import ProfileList, { ListItemData } from 'components/ProfileList';
import { supabase } from 'utils/supabase';
import SearchBar from 'components/SearchBar';
import { useSession } from 'utils/context';
import { getUsername, getAllUsers } from 'utils/api';

export default function Search() {
  const [data, setData] = useState<ListItemData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const session = useSession();

  useEffect(() => {
    async function getData() {
      const users = await getAllUsers(session ?? undefined);
      const formattedData: ListItemData[] = [];
      users?.forEach(({ username, avatar_url }) => {
        formattedData.push({ title: username, avatarUrl: avatar_url, friendStatus: 'none' });
      });
      return formattedData;
    }
    getData().then(setData);
  }, []);

  function onChangeText(value: string) {
    setSearchValue(value);
  }

  function filterData(data: ListItemData[]) {
    return data.filter((item) => item.title.match(searchValue));
  }

  return (
    <>
      <Container>
        <SearchBar value={searchValue} callback={onChangeText}></SearchBar>
        <ProfileList data={filterData(data)}></ProfileList>
      </Container>
    </>
  );
}
