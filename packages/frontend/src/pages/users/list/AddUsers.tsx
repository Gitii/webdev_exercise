import useAddUsers from '../../../api/useAddUsers';
import Button from '../../../components/Button';
import ErrorView from '../../../components/ErrorView';

export default function AddUsers({ refetch }: { refetch: () => void }) {
  const { mutate, error, isMutating } = useAddUsers(refetch);

  return (
    <>
      <Button disabled={error || isMutating} onClick={mutate}>
        Add Random Users
      </Button>
      {error && <ErrorView error={error} />}
    </>
  );
}
