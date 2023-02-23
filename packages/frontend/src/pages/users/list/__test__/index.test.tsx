import { act, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import buildEndpointUrl from '../../../../api/endpoint';
import {
  LOCATION_DISPLAY_TEST_ID,
  render,
  server,
} from '../../../../test/test-utils';
import UserList from '../';
import { User } from '../../../../schema/User';
import Skill from '../../../../schema/Skill';

const SKILLS: Skill[] = [
  { id: 1, name: 'developer' },
  { id: 2, name: 'manager' },
];

const USERS: User[] = [
  {
    id: 1,
    name: 'foo',
    skills: [],
  },
  {
    id: 2,
    name: 'bar',
    skills: [SKILLS[0]],
  },
];

describe('ListUsers', () => {
  it('should render users when fetched from server when no filter is set', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );
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

    expect(screen.getByRole('combobox')).toBeInTheDocument();

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

  it('should filter by skill when filter is set', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([...SKILLS]));
      }),
    );
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([...USERS]));
      }),
    );

    const { user } = render(<UserList />);

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(USERS.length + 1);
    });

    await user.selectOptions(
      screen.getByRole('combobox'),
      String(SKILLS[0].id),
    );

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2);
    });

    await user.selectOptions(screen.getByRole('combobox'), '');

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(USERS.length + 1);
    });
  });

  it('should render empty table with status when there are no users', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1);
    });

    expect(screen.getByRole('status')).toHaveTextContent('No entries');
  });

  it('should render empty table with status when there are no users who match filter', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([...SKILLS]));
      }),
    );
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([...USERS]));
      }),
    );

    const { user } = render(<UserList />);

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(USERS.length + 1);
    });

    await user.selectOptions(
      screen.getByRole('combobox'),
      String(SKILLS[1].id),
    );

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1);
    });

    expect(screen.getByRole('status')).toHaveTextContent(
      'No entries match filter criteria',
    );
  });

  it('should render error message when fetching users from server fails', async () => {
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.status(400), ctx.text('Boom!'));
      }),
    );
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByRole('contentinfo')).toHaveTextContent('Boom!');
  });

  it('should render error message when fetching skills from server fails', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.status(400), ctx.text('Boom!'));
      }),
    );
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([]));
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
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
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

    await act(async () => {
      await user.click(
        screen.getByRole('button', { name: 'Add Random Users' }),
      );

      await waitFor(() => expect(added).toBe(true));
    });
  });

  it('should delete all users when clicking on the delete button', async () => {
    server.use(
      rest.get(buildEndpointUrl('/users'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
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

    await act(async () => {
      await user.click(
        screen.getByRole('button', { name: 'Remove All Users' }),
      );

      await waitFor(() => expect(deleted).toBe(true));
    });
  });

  it('should navigate to skill assignment page when clicked on the assign button', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );
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
