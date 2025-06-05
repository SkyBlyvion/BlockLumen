import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'Preference' })
export class Preference {
  @PrimaryGeneratedColumn()
  preference_id!: number;

  @ManyToOne(() => User, (user) => user.preferences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 100 })
  pref_key!: string;

  @Column({ type: 'varchar', length: 255 })
  pref_value!: string;
}
