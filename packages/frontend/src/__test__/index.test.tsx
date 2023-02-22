jest.mock('../App', () => ({
  default: () => <div>main</div>,
  __esModule: true,
}));
jest.mock('react-dom');

import { render } from 'react-dom';

const mockedRender = render as jest.MockedFunction<typeof render>;

describe('Main Entrypoint', () => {
  it('should render app', async () => {
    await import('../index');

    expect(mockedRender).toHaveBeenCalled();
  });
});
