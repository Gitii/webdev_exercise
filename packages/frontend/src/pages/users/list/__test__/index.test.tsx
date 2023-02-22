import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import buildEndpointUrl from '../../../../api/endpoint';
import {
  LOCATION_DISPLAY_TEST_ID,
  render,
  server,
} from '../../../../test/test-utils';
import UserList from '../';
import { User } from '../../../../schema/User';

const USERS: User[] = [
  {
    id: 1,
    name: 'foo',
    skills: [],
  },
  {
    id: 2,
    name: 'bar',
    skills: [{ id: 1, name: 'developer' }],
  },
];

describe('ListUsers', () => {
  it('should render users when fetched from server', async () => {
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([...USERS]));
      }),
    );

    render(<UserList />);

    expect(
      screen.getByRole('button', { name: 'Add Random Users' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Remove All Users' }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(3);
    });

    const [, firstRow, secondRow] = screen.getAllByRole('row');

    expect(firstRow).toHaveTextContent(USERS[0].id.toString());
    expect(firstRow).toHaveTextContent(USERS[0].name);
    expect(secondRow).toHaveTextContent(USERS[1].id.toString());
    expect(secondRow).toHaveTextContent(USERS[1].name);
    expect(secondRow).toHaveTextContent(USERS[1].skills[0].name);
  });

  it('should render error message when fetching from server fails', async () => {
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.status(400), ctx.text('Boom!'));
      }),
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByRole('contentinfo')).toHaveTextContent('Boom!');
  });

  it('should add users when clicking on the create button', async () => {
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );

    let added = false;

    server.use(
      rest.post(buildEndpointUrl('/users'), (_req, res, ctx) => {
        added = true;
        return res(ctx.status(200));
      }),
    );

    const { user } = render(<UserList />);

    await user.click(screen.getByRole('button', { name: 'Add Random Users' }));

    await waitFor(() => expect(added).toBe(true));
  });

  it('should delete all users when clicking on the delete button', async () => {
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );

    let deleted = false;

    server.use(
      rest.delete(buildEndpointUrl('/users'), (_req, res, ctx) => {
        deleted = true;
        return res(ctx.status(200));
      }),
    );

    const { user } = render(<UserList />);

    await user.click(screen.getByRole('button', { name: 'Remove All Users' }));

    await waitFor(() => expect(deleted).toBe(true));
  });

  it('should navigate to skill assignment page when clicked on the assign button', async () => {
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([USERS[0]]));
      }),
    );
    const { user } = render(<UserList />, { pathName: '/skills' });

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2);
    });

    await user.click(screen.getByRole('button', { name: 'Assign Skills' }));

    expect(
      await screen.findByTestId(LOCATION_DISPLAY_TEST_ID),
    ).toHaveTextContent(/^\/users\/1\/assignSkills$/);
  });
});
