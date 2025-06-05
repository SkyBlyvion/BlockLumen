import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'Price' })
@Index(['crypto_symbol', 'recorded_at'])
export class Price {
  @PrimaryGeneratedColumn()
  price_id!: number;

  @Column({ type: 'varchar', length: 10 })
  crypto_symbol!: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  value!: number;

  @Column({ type: 'datetime' })
  recorded_at!: Date;
}
