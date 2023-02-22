import useRemoveUsers from '../../../api/useRemoveUsers';
import Button from '../../../components/Button';

export default function RemoveUsers({ refetch }: { refetch: () => void }) {
  const { mutate, isMutating } = useRemoveUsers(refetch);

  return (
    <Button disabled={isMutating} onClick={mutate}>
      Remove All Users
    </Button>
  );
}
