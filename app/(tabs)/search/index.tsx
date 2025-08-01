import { useCallback, useEffect, useState } from 'react';

import { getAllFriendStatus } from 'api/friends-api';
import { getUsername, getAllUsers } from 'api/profiles-api';
import { FriendStatus, ProfileData } from 'utils/profile.types';
import { useSession } from 'utils/AuthContext';

import Container from 'components/Container';
import ProfileList from 'components/ProfileList';
import SearchBar from 'components/SearchBar';

export default function Search() {
  const [data, setData] = useState<ProfileData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const session = useSession();

  const getData = useCallback(async () => {
    const users = await getAllUsers();
    const friends = await getAllFriendStatus(session ?? undefined);
    const currentUser = await getUsername(session ?? undefined);

    const formattedData: ProfileData[] = [];
    users?.forEach(({ username, avatar_url }) => {
      if (username === currentUser) {
        // filter out current user (self)
        return;
      }
      const friend = friends?.find((i) => i.user === username || i.friend === username);
      let status: FriendStatus;
      if (friend?.status === 'pending') {
        status = 'requested';
      } else if (friend?.status === 'accepted') {
        status = 'accepted';
      } else {
        status = 'none';
      }
      formattedData.push({
        username: username,
        avatarUrl: avatar_url,
        friendStatus: status,
      });
    });
    return formattedData;
  }, [session]);

  useEffect(() => {
    if (session) {
      getData().then(setData);
    }
  }, [session, getData]);

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
        <ProfileList
          data={filterData(data)}
          onRefresh={() => {}}
          refreshing={false}
          ref={undefined}></ProfileList>
      </Container>
    </>
  );
}
