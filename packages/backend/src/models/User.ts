import { Entity, Column } from 'typeorm';

@Entity()
export default class User {
  @Column({
    primary: true,
    generated: true,
  })
  id: number = undefined!;

  @Column({
    nullable: false,
    unique: true,
    type: 'varying character',
    length: 80,
  })
  name: string = undefined!;
}
