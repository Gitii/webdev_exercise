import App from '../App';
import { render } from '../test/test-utils';

describe('App', () => {
  it('should render app', async () => {
    render(<App />, { pathName: '/foobar' });
  });
});
