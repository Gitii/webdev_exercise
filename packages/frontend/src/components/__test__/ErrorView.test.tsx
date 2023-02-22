import { render } from '../../test/test-utils';
import ErrorView from '../ErrorView';
import { screen } from '@testing-library/react';

describe('ErrorView', () => {
  it('should render error message', () => {
    const msg = 'foobar';
    render(<ErrorView error={msg} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'An error has occurred!',
    );
    expect(screen.getByRole('contentinfo')).toHaveTextContent(msg);
  });

  it('should render message of Error', () => {
    const msg = new Error('foobar');
    render(<ErrorView error={msg} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'An error has occurred!',
    );
    expect(screen.getByRole('contentinfo')).toHaveTextContent(msg.message);
  });
});
