import { screen, waitFor } from '@testing-library/react';
import CreateSkill from '..';
import {
  LOCATION_DISPLAY_TEST_ID,
  render,
  server,
} from '../../../../test/test-utils';
import { rest } from 'msw';
import buildEndpointUrl from '../../../../api/endpoint';
import { act } from 'react-dom/test-utils';

describe('CreateSkill', () => {
  it('should render form for skill creation', () => {
    render(<CreateSkill />);

    expect(screen.getByRole('textbox', { name: 'name' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should do rest call and navigate when form is submitted', async () => {
    let called = false;
    server.use(
      rest.post(buildEndpointUrl('skills'), async (req, res, ctx) => {
        expect(await req.json()).toEqual({ name: 'foobar' });
        called = true;
        return res(ctx.status(201));
      }),
    );

    const { user } = render(<CreateSkill />, {
      pathName: '/skills/create',
    });

    await user.type(screen.getByRole('textbox'), 'foobar');

    await act(async () => {
      await user.click(screen.getByRole('button'));

      await waitFor(() =>
        expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
          /^[/]skills$/,
        ),
      );
    });

    expect(called).toBe(true);
  });

  it('should render error message when rest call fails', async () => {
    let called = false;
    server.use(
      rest.post(buildEndpointUrl('/skills'), async (req, res, ctx) => {
        expect(await req.json()).toEqual({ name: 'foobar' });
        called = true;
        return res(ctx.status(500), ctx.text('Boom!'));
      }),
    );

    const { user } = render(<CreateSkill />, {
      pathName: '/skills/create',
    });

    await user.type(screen.getByRole('textbox'), 'foobar');

    await act(async () => {
      await user.click(screen.getByRole('button'));

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'An error has occurred!',
      );
    });

    expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
      /^\/skills\/create$/,
    );
    expect(called).toBe(true);

    expect(screen.getByRole('contentinfo')).toHaveTextContent('Boom!');
  });
});
