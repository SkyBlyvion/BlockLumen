import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Wallet } from './Wallet';
import { Trade } from './Trade';

@Entity({ name: 'Wallet_Holding' })
export class WalletHolding {
  @PrimaryGeneratedColumn()
  holding_id!: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.holdings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'wallet_id' })
  wallet!: Wallet;

  @Column({ type: 'varchar', length: 10 })
  crypto_symbol!: string;

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  quantity!: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  average_price!: number | null;

  @OneToMany(() => Trade, (trade) => trade.holding)
  trades!: Trade[];
}
