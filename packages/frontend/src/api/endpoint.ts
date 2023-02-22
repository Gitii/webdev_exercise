export default function buildEndpointUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;

  return `${process.env.REACT_APP_BACKEND_URL}/${cleanPath}`;
}
