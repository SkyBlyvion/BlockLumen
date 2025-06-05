import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Learn } from './Learn';

@Entity({ name: 'User_Learn' })
export class UserLearn {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  learn_id!: number;

  @ManyToOne(() => User, (user) => user.userLearns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Learn, (learn) => learn.userLeans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'learn_id' })
  learn!: Learn;

  @Column({ type: 'boolean', default: false })
  is_completed!: boolean;

  @Column({ type: 'datetime', nullable: true })
  completed_at!: Date | null;
}
