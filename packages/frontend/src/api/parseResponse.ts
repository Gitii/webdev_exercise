export default async function parseResponse(
  res: Response,
): Promise<Record<string, unknown>> {
  const responseBody: Record<string, unknown> =
    res.headers.get('Content-Type') === 'application/json'
      ? await res.json()
      : res.headers.get('Content-Type') === 'text/plain'
      ? { message: await res.text() }
      : {};

  if (!res.ok) {
    throw new Error(String(responseBody['message'] ?? 'Unknown Error'));
  }

  return responseBody;
}
