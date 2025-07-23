import { Activity } from 'utils/activity.types';
import { Container } from 'components/Container';
import BucketList from 'components/BucketList';
import { useSession } from 'utils/context';

export default function Home() {
  const session = useSession();
  const testData: Activity = {
    id: session?.user.id ?? '',
    activity: 'Test',
    created_at: new Date(Date.now()),
    description: 'This is a test activity',
    status: 'complete',
    isPublic: true,
    planned_date: new Date(Date.now()),
    completion_date: new Date(Date.now()),
    location: '',
  };

  return (
    <Container>
      <BucketList data={[testData]} userId={session?.user.id ?? ''}></BucketList>
    </Container>
  );
}
