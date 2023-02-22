import useAddUsers from '../../../api/useAddUsers';
import Button from '../../../components/Button';

export default function AddUsers({ refetch }: { refetch: () => void }) {
  const { mutate, isMutating } = useAddUsers(refetch);

  return (
    <>
      <Button disabled={isMutating} onClick={mutate}>
        Add Random Users
      </Button>
    </>
  );
}
