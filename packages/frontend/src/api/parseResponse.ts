export default async function parseResponse(
  res: Response,
): Promise<Record<string, unknown> | undefined> {
  const responseBody: Record<string, unknown> | undefined = res.headers
    .get('Content-Type')
    ?.includes('application/json')
    ? await res.json()
    : res.headers.get('Content-Type')?.includes('text/plain')
    ? { message: await res.text() }
    : undefined;

  if (!res.ok) {
    throw new Error(String(responseBody?.message ?? 'Unknown Error'));
  }

  return responseBody;
}
