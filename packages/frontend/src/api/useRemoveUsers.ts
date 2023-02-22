import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { deleteMutator as mutator } from './mutator';

export default function useRemoveUsers(onSuccess: () => void) {
  const handleSuccess = useCallback(() => onSuccess(), [onSuccess]);
  const { trigger, error, isMutating } = useSWRMutation('/users', mutator, {
    onSuccess: handleSuccess,
    throwOnError: false,
  });
  const mutate = useCallback(() => trigger(), [trigger]);

  return { mutate, error, isMutating };
}
