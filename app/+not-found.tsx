import { ErrorBoundary } from 'components/ErrorBoundary';
import { Container } from 'components/Container';
import { router } from 'expo-router';

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
