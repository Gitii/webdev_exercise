import { isPlainObject } from 'lodash';
import buildEndpointUrl from './endpoint';
import parseResponse from './parseResponse';

function createMutator(method: string) {
  return async function (
    path: string,
    extraArgs?: { arg?: Record<string, unknown> },
  ) {
    const body = isPlainObject(extraArgs?.arg)
      ? JSON.stringify(extraArgs?.arg)
      : undefined;
    const headers: Record<string, string> = body
      ? {
          'Content-Type': 'application/json',
        }
      : {};

    return await parseResponse(
      await fetch(buildEndpointUrl(path), {
        method: method,
        body,
        headers,
      }),
    );
  };
}

export const postMutator = createMutator('POST');
export const deleteMutator = createMutator('DELETE');
