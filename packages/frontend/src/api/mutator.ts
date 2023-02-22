import { isPlainObject } from 'lodash';

function createMutator(method: string) {
  return async function (
    path: string,
    extraArgs?: { arg?: Record<string, unknown> },
  ) {
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    const body = isPlainObject(extraArgs?.arg)
      ? JSON.stringify(extraArgs?.arg)
      : undefined;
    const headers: Record<string, string> = body
      ? {
          'Content-Type': 'application/json',
        }
      : {};

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${cleanPath}`,
      {
        method: method,
        body,
        headers,
      },
    );

    if (!res.ok) {
      throw new Error('network error', {
        cause: res.json(),
      });
    }

    if (res.headers.get('Content-Type') === 'application/json') {
      return res.json();
    }
  };
}

export const postMutator = createMutator('POST');
export const deleteMutator = createMutator('DELETE');
