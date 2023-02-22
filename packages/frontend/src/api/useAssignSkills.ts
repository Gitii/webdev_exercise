import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { postMutator as mutator } from './mutator';

export default function useAssignSkill(userId: number, onSuccess: () => void) {
  const handleSuccess = useCallback(() => onSuccess(), [onSuccess]);
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
