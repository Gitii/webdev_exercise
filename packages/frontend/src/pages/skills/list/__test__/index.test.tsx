import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import buildEndpointUrl from '../../../../api/endpoint';
import {
  LOCATION_DISPLAY_TEST_ID,
  render,
  server,
} from '../../../../test/test-utils';
import SkillList from '../';
import Skill from '../../../../schema/Skill';

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

describe('ListSkills', () => {
  it('should render skills when fetched from server', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([...SKILLS]));
      }),
    );

    render(<SkillList />);

    expect(
      screen.getByRole('button', { name: 'Create Skill' }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(3);
    });

    const [, firstRow, secondRow] = screen.getAllByRole('row');

    expect(firstRow).toHaveTextContent(SKILLS[0].id.toString());
    expect(firstRow).toHaveTextContent(SKILLS[0].name);
    expect(secondRow).toHaveTextContent(SKILLS[1].id.toString());
    expect(secondRow).toHaveTextContent(SKILLS[1].name);
  });

  it('should render error message when fetching from server fails', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.status(400), ctx.text('Boom!'));
      }),
    );

    render(<SkillList />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByRole('contentinfo')).toHaveTextContent('Boom!');
  });

  it('should navigate to skill creation page when clicked on the create button', async () => {
    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );
    const { user } = render(<SkillList />, { pathName: '/skills' });

    await user.click(screen.getByRole('button', { name: 'Create Skill' }));

    expect(
      await screen.findByTestId(LOCATION_DISPLAY_TEST_ID),
    ).toHaveTextContent(/^\/skills\/create$/);
  });

  it('should delete skill when delete button is pressed', async () => {
    let deleted = false;

    server.use(
      rest.get(buildEndpointUrl('/skills'), (_req, res, ctx) => {
        return res(ctx.json([SKILLS[0]]));
      }),
    );
    server.use(
      rest.delete(buildEndpointUrl('/skills/1'), (_req, res, ctx) => {
        deleted = true;
        return res(ctx.status(200));
      }),
    );
    const { user } = render(<SkillList />);

    await waitFor(() => screen.getByRole('button', { name: 'Delete' }));

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => expect(deleted).toBe(true));
  });
});
