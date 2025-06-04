import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Wallet } from './Wallet';
import { Preference } from './Preference';
import { UserLearn } from './UserLearn';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  user_id!: number;

  @Column({ type: 'varchar', length: 100 })
  username!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash!: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  created_at!: Date;

  @Column({ type: 'datetime', name: 'last_login', nullable: true })
  last_login!: Date | null;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets!: Wallet[];

  @OneToMany(() => Preference, (pref) => pref.user)
  preferences!: Preference[];

  @OneToMany(() => UserLearn, (ul) => ul.user)
  userLearns!: UserLearn[];
}
