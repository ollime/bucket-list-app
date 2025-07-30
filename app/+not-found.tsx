import { router } from 'expo-router';

import { ErrorBoundary } from 'components/ErrorBoundary';
import Container from 'components/Container';

export default function NotFoundPage() {
  return (
    <Container>
      <ErrorBoundary
        error={Error('Page not found')}
        retry={async () => {
          router.replace('/home');
        }}></ErrorBoundary>
    </Container>
  );
}
