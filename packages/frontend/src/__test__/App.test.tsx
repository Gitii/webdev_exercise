import App from '../App';
import { render } from '../test/test-utils';
import { screen } from '@testing-library/react';

describe('App', () => {
  it('should render app', () => {
    render(<App />, { pathName: '/foobar' });
    expect(
      screen.getByRole('heading', { name: 'Platform Users' }),
    ).toBeInTheDocument();
  });
});
