import useRemoveSkill from '../../../api/useRemoveSkill';
import Button from '../../../components/Button';

export default function DeleteSkill({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess: () => void;
}) {
  const { error, isMutating, mutate } = useRemoveSkill(id, onSuccess);

  return (
    <Button onClick={mutate} disabled={error || isMutating} theme="link">
      Delete
    </Button>
  );
}
