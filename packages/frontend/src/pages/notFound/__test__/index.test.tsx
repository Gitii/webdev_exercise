import NotFound from '../';
import { screen } from '@testing-library/react';
import { render } from '../../../test/test-utils';

describe('notFound', () => {
  it('should render page', () => {
    render(<NotFound />, { pathName: '/foobar' });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('/foobar');
  });
});
