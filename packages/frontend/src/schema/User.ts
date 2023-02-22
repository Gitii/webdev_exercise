import type Skill from './Skill';

export interface User {
  id: number;
  name: string;
  skills: Skill[];
}
