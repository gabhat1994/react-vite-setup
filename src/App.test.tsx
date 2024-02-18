import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import App from './App';

test('App', () => {
  const { queryByTestId } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(queryByTestId('HOME')).not.toBeInTheDocument();
});
