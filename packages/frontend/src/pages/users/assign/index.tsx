import { FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAssignSkills from '../../../api/useAssignSkills';
import useSkills from '../../../api/useSkills';
import Button from '../../../components/Button';
import ErrorView from '../../../components/ErrorView';

export default function () {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { skills, error: errorSkills } = useSkills();
  const handleSuccess = useCallback(() => navigate('/users'), [navigate]);
  const { mutate, error, isMutating, reset } = useAssignSkills(
    Number(userId),
    handleSuccess,
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSkills(
        Array.from(e.target.selectedOptions).map((o) => o.value),
      );
      reset();
    },
    [setSelectedSkills],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      mutate({
        skillIds: selectedSkills.map(Number),
      });
    },
    [mutate, selectedSkills],
  );

  if (errorSkills) {
    return <ErrorView error="Failed to load skills" />;
  }

  return (
    <div>
      <h1>Assign skills</h1>
      <p>
        Select or deselect skills you want to be assigned to the user. <br />
        Hold the Ctrl, Command, or Shift keys and then click multiple options to
        select/deselect them.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="skills">Skills: </label>
          <select
            name="skills"
            multiple
            size={5}
            onChange={handleChange}
            value={selectedSkills.map(String)}
          >
            {skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <Button disabled={error || isMutating} type="submit">
          Assign Skills
        </Button>
      </form>
      {error && <ErrorView error={error} />}
    </div>
  );
}
