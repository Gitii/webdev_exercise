import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import Skill from './Skill';

@Entity()
export default class User {
  @Column({
    primary: true,
    generated: true,
  })
  id!: number;

  @Column({
    nullable: false,
    unique: true,
    type: 'varying character',
    length: 80,
  })
  name!: string;

  @ManyToMany(() => Skill, {
    eager: true,
  })
  @JoinTable()
  skills!: Skill[];
}
