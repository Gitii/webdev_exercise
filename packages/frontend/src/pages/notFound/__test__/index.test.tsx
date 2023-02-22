import NotFound from '../';
import { screen } from '@testing-library/react';
import { render, LOCATION_DISPLAY_TEST_ID } from '../../../test/test-utils';

describe('notFound', () => {
  it('should render page with back link', () => {
    render(<NotFound />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go back to home' }),
    ).toBeInTheDocument();
  });

  it('should navigate to home screen when back link has been clicked', async () => {
    const { user } = render(<NotFound />, {});

    expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
      /^[/]$/,
    );

    await user.click(screen.getByRole('link'));

    expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
      /^[/]$/,
    );
  });
});
