import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserLearn } from './UserLearn';

@Entity({ name: 'Learn' })
export class Learn {
  @PrimaryGeneratedColumn()
  learn_id!: number;

  @Column({ type: 'varchar', length: 150 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'int' })
  order_index!: number;

  @OneToMany(() => UserLearn, (ul) => ul.learn)
  userLeans!: UserLearn[];
}
