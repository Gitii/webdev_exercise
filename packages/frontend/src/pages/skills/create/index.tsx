import { FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateSkill from '../../../api/useCreateSkill';
import Button from '../../../components/Button';
import ErrorView from '../../../components/ErrorView';

export default function () {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const handleSuccess = useCallback(() => navigate('/skills'), [navigate]);
  const { mutate, error, isMutating, reset } = useCreateSkill(handleSuccess);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      reset();
    },
    [setName],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      void mutate({
        name,
      });
    },
    [mutate, name],
  );

  return (
    <div>
      <h1>Create new skill</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            aria-label="name"
            maxLength={80}
            required
            value={name}
            disabled={isMutating}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <Button disabled={error || isMutating} type="submit">
          Create skill
        </Button>
      </form>
      {error && <ErrorView error={error} />}
    </div>
  );
}
