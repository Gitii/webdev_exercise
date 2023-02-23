import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteMutator as mutator } from './mutator';

export default function useRemoveSkill(skillId: number, onSuccess: () => void) {
  const { mutate: invalidateCache } = useSWRConfig();
  const handleSuccess = useCallback(() => {
    void invalidateCache('/users');
    onSuccess();
  }, [onSuccess]);
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
