import buildEndpointUrl from './endpoint';
import parseResponse from './parseResponse';

export default async function fetcher(path: string): Promise<any> {
  return await parseResponse(await fetch(buildEndpointUrl(path)));
}
