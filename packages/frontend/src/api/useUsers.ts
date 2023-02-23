import fetcher from './fetcher';
import useSWR from 'swr';
import { User } from '../schema/User';

export default function useUsers() {
  const { data, error, mutate } = useSWR<User[]>('/users', fetcher);

  return { users: data ?? [], error, refetch: mutate };
}
