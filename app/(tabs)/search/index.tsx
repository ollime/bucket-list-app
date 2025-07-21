import { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import ProfileList from 'components/ProfileList';
import SearchBar from 'components/SearchBar';
import { useSession } from 'utils/context';
import { getAllUsers } from 'utils/api';
import { ProfileData } from 'utils/Profile.types';

export default function Search() {
  const [data, setData] = useState<ProfileData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const session = useSession();

  useEffect(() => {
    async function getData() {
      const users = await getAllUsers(session ?? undefined);
      const formattedData: ProfileData[] = [];
      users?.forEach(({ username, avatar_url }) => {
        formattedData.push({ username: username, avatarUrl: avatar_url, friendStatus: 'none' });
      });
      return formattedData;
    }
    getData().then(setData);
  }, []);

  function onChangeText(value: string) {
    setSearchValue(value);
  }

  function filterData(data: ProfileData[]) {
    return data.filter((item) => item.username.match(searchValue));
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
