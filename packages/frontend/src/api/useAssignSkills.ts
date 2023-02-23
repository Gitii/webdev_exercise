import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { postMutator as mutator } from './mutator';

export default function useAssignSkill(userId: number, onSuccess: () => void) {
  const { mutate: invalidateCache } = useSWRConfig();
  const handleSuccess = useCallback(() => {
    invalidateCache('/users');
    onSuccess();
  }, [onSuccess]);
  const { trigger, error, isMutating, reset } = useSWRMutation(
    `/users/${userId}/assignSkills`,
    mutator,
    {
      throwOnError: false,
      onSuccess: handleSuccess,
    },
  );
  const mutate = useCallback(
    (args: { skillIds: number[] }) => trigger(args),
    [trigger],
  );

  return { mutate, error, isMutating, reset };
}
