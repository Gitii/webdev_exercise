import { Entity, Column } from 'typeorm';

@Entity()
export default class Skill {
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
}
