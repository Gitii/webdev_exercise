export async function fetchUsers() {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
  return await response.json();
}
