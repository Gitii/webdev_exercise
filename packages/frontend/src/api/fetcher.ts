export default async function fetcher(path: string) {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${cleanPath}`);
  if (!res.ok) {
    throw new Error('network error', {
      cause: res.json(),
    });
  }

  return res.json();
}
