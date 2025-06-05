import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WalletHolding } from './WalletHolding';

export enum TradeType {
  BUY = 'buy',
  SELL = 'sell',
}

@Entity({ name: 'Trade' })
export class Trade {
  @PrimaryGeneratedColumn()
  trade_id!: number;

  @ManyToOne(() => WalletHolding, (holding) => holding.trades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'holding_id' })
  holding!: WalletHolding;

  @Column({ type: 'varchar', length: 10 })
  crypto_symbol!: string;

  @Column({ type: 'enum', enum: TradeType })
  type!: 'buy' | 'sell';

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  amount!: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  fee!: number;

  @CreateDateColumn({ type: 'datetime' })
  timestamp!: Date;
}
