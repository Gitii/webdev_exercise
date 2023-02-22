import { useCallback } from 'react';
import useRemoveUsers from '../../../api/useRemoveUsers';
import Button from '../../../components/Button';
import ErrorView from '../../../components/ErrorView';

export default function RemoveUsers({ refetch }: { refetch: () => void }) {
  const { mutate, error, isMutating } = useRemoveUsers(refetch);

  return (
    <>
      <Button disabled={error || isMutating} onClick={mutate}>
        Remove All Users
      </Button>
      {error && <ErrorView error={error} />}
    </>
  );
}
