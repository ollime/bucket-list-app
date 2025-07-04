import React from 'react';
import { Text } from 'react-native';
import { Container } from 'components/Container';
import ProfileList from 'components/ProfileList';

export default function Home() {
  const DATA = [{ title: 'First item' }, { title: 'Second item' }];
  return (
    <>
      <Container>
        <Text>Hello</Text>
        <ProfileList data={DATA}></ProfileList>
      </Container>
    </>
  );
}
