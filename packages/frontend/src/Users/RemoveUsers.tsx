import { useCallback } from 'react';

const deleteUsersBulk = async () => {
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
    method: 'DELETE',
  });
};

export default function RemoveUsers({ refetch }: { refetch: () => void }) {
  const onClick = useCallback(() => {
    deleteUsersBulk().then(refetch);
  }, [refetch]);
  return <button onClick={onClick}>Remove Users</button>;
}
