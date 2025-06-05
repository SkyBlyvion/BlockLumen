import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { WalletHolding } from './WalletHolding';

@Entity({ name: 'Wallet' })
export class Wallet {
  @PrimaryGeneratedColumn()
  wallet_id!: number;

  @ManyToOne(() => User, (user) => user.wallets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 10000.0 })
  initial_balance!: number;

  @OneToMany(() => WalletHolding, (wh) => wh.wallet)
  holdings!: WalletHolding[];
}
