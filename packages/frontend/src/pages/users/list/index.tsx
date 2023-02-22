import AddUsers from './AddUsers';
import RemoveUsers from './RemoveUsers';
import { User } from '../../../schema/User';
import useSWR from 'swr';
import fetcher from '../../../api/fetcher';
import Loading from '../../../components/Loading';
import ErrorView from '../../../components/ErrorView';
import Table from '../../../components/Table';
import { ButtonContainer } from '../../../components/Button';
import ManageSkillsButton from './ManageSkillsButton';

export default function Users() {
  const { data, error, isLoading, mutate } = useSWR<User[]>('/users', fetcher);

  if (error) {
    return <ErrorView error={error} />;
  }

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ButtonContainer>
        <AddUsers refetch={mutate} />
        <RemoveUsers refetch={mutate} />
      </ButtonContainer>
      <Table<User>
        rows={data}
        toRow={(user) => [
          user.id,
          user.name,
          user.skills.map((s) => s.name).join(', '),
          <ManageSkillsButton userId={user.id} />,
        ]}
        header={['Id', 'Name', 'Skills', 'Actions']}
        getRowKey={(skill) => skill.id}
      />
    </div>
  );
}
