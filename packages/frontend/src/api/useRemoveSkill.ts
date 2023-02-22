import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { deleteMutator as mutator } from './mutator';

export default function useRemoveSkill(skillId: number, onSuccess: () => void) {
  const handleSuccess = useCallback(() => onSuccess(), [onSuccess]);
  const { trigger, error, isMutating } = useSWRMutation(
    `/skills/${skillId}`,
    mutator,
    {
      onSuccess: handleSuccess,
      throwOnError: false,
    },
  );
  const mutate = useCallback(() => trigger(), [trigger]);

  return { mutate, error, isMutating };
}
