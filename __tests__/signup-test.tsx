import { render, screen } from '@testing-library/react-native';

import App from '../app/index';

jest.mock('components/Container', () => ({
  Container: ({ children }: any) => <>{children}</>,
}));

jest.mock('components/Auth', () => () => null);

describe('<App/>', () => {
  test('App title renders correctly', async () => {
    render(<App />);
    const text = screen.getByText('App');
    expect(text).toBeTruthy();
  });
});
