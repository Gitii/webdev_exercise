import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { postMutator as mutator } from './mutator';

export default function useCreateSkill(onSuccess: () => void) {
  const handleSuccess = useCallback(() => onSuccess(), [onSuccess]);
  const { trigger, error, isMutating, reset } = useSWRMutation(
    '/skills',
    mutator,
    {
      throwOnError: false,
      onSuccess: handleSuccess,
    },
  );
  const mutate = useCallback(
    (args: { name: string }) => trigger(args),
    [trigger],
  );

  return { mutate, error, isMutating, reset };
}
