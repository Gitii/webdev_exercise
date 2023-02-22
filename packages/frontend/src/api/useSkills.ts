import fetcher from './fetcher';
import useSWR from 'swr';
import Skill from '../schema/Skill';

export default function useSkills() {
  const { data: skills, error, mutate } = useSWR<Skill[]>('/skills', fetcher);

  return { skills: skills ?? [], error, refetch: mutate };
}
