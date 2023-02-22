jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  __esModule: true,
}));

import { screen, waitFor } from '@testing-library/react';
import AssignSkills from '..';
import {
  LOCATION_DISPLAY_TEST_ID,
  render,
  server,
} from '../../../../test/test-utils';
import { rest } from 'msw';
import buildEndpointUrl from '../../../../api/endpoint';
import Skill from '../../../../schema/Skill';
import { useParams } from 'react-router-dom';

const mockedUseParams = useParams as jest.MockedFunction<typeof useParams>;

const SKILLS: Skill[] = [
  {
    id: 1,
    name: 'foo',
  },
  {
    id: 2,
    name: 'bar',
  },
];

describe('AssignSkill', () => {
  it('should render form for skill assignment', () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([...SKILLS]));
      }),
    );
    mockedUseParams.mockReturnValue({ userId: '1' });

    render(<AssignSkills />);

    expect(screen.getByRole('listbox', { name: 'skills' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render error message when fetching skills fails', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    mockedUseParams.mockReturnValue({ userId: '1' });

    render(<AssignSkills />, {
      pathName: '/users/1/assignSkills',
    });

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'An error has occurred!',
    );
  });

  it('should do rest call and navigate when form is submitted', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([...SKILLS]));
      }),
    );

    let called = false;
    server.use(
      rest.post(
        buildEndpointUrl('/users/1/assignSkills'),
        async (req, res, ctx) => {
          expect(await req.json()).toEqual({ skillIds: [1] });
          called = true;
          return res(ctx.status(201));
        },
      ),
    );

    mockedUseParams.mockReturnValue({ userId: '1' });

    const { user } = render(<AssignSkills />, {
      pathName: '/users/1/assignSkills',
    });

    await waitFor(() => expect(screen.getByRole('option', { name: 'foo' })));

    await user.selectOptions(screen.getByRole('listbox'), ['1']);

    await user.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
        /^\/users$/,
      ),
    );

    expect(called).toBe(true);
  });

  it('should render error message when rest call fails', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([...SKILLS]));
      }),
    );

    server.use(
      rest.post(
        buildEndpointUrl('/users/1/assignSkills'),
        async (_req, res, ctx) => {
          return res(ctx.status(400));
        },
      ),
    );
    mockedUseParams.mockReturnValue({ userId: '1' });

    const { user } = render(<AssignSkills />, {
      pathName: '/users/1/assignSkills',
    });

    await user.click(screen.getByRole('button'));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'An error has occurred!',
    );

    expect(screen.getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(
      /^\/users\/1\/assignSkills$/,
    );
  });
});
