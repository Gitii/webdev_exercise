import useSkills from '../../../api/useSkills';
import { ButtonContainer } from '../../../components/Button';
import ErrorView from '../../../components/ErrorView';
import Table from '../../../components/Table';
import Skill from '../../../schema/Skill';
import CreateSkillButton from './CreateSkillButton';
import DeleteSkill from './DeleteSkillButton';

export default function () {
  const { skills, error, refetch } = useSkills();

  if (error) {
    return <ErrorView error={error} />;
  }
  
  return (
    <div>
      <ButtonContainer>
        <CreateSkillButton />
      </ButtonContainer>
      <Table<Skill>
        header={['Id', 'Name', 'Actions']}
        rows={skills}
        toRow={(skill) => [
          skill.id,
          skill.name,
          <DeleteSkill id={skill.id} onSuccess={refetch} />,
        ]}
        getRowKey={(skill) => skill.id}
      />
    </div>
  );
}
