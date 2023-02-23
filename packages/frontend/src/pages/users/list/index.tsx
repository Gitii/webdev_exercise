import AddUsers from './AddUsers';
import RemoveUsers from './RemoveUsers';
import { User } from '../../../schema/User';
import ErrorView from '../../../components/ErrorView';
import Table from '../../../components/Table';
import { ButtonContainer } from '../../../components/Button';
import ManageSkillsButton from './ManageSkillsButton';
import useSkills from '../../../api/useSkills';
import { useState } from 'react';
import SkillFilter from './SkillFilter';
import useUsers from '../../../api/useUsers';

export default function Users() {
  const [selectedSkill, setSelectedSkill] = useState<number | undefined>();
  const { users, error: errorUsers, refetch } = useUsers();
  const { skills, error: errorSkills } = useSkills();

  if (errorUsers || errorSkills) {
    return <ErrorView error={errorUsers ?? errorSkills} />;
  }

  const result =
    selectedSkill === undefined
      ? users
      : users.filter((u) => !!u.skills.find((s) => s.id === selectedSkill));

  return (
    <div>
      <ButtonContainer>
        <AddUsers refetch={refetch} />
        <RemoveUsers refetch={refetch} />
      </ButtonContainer>
      <SkillFilter
        value={selectedSkill}
        onChange={setSelectedSkill}
        options={skills}
      />
      <Table<User>
        rows={result}
        toRow={(user) => [
          user.id,
          user.name,
          user.skills.map((s) => s.name).join(', '),
          <ManageSkillsButton userId={user.id} />,
        ]}
        header={['Id', 'Name', 'Skills', 'Actions']}
        getRowKey={(skill) => skill.id}
      />
      <div role="status">
        {users.length === 0
          ? 'No entries'
          : result.length === 0
          ? 'No entries match filter criteria'
          : null}
      </div>
    </div>
  );
}
