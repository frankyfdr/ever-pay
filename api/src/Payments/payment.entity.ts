import { ClientEntity } from 'src/clients/clients.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export class PaymentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity, (client) => client.payments)
  @JoinColumn({ name: 'clientId' })
  client: ClientEntity;

  @Column()
  amount: number;

  @Column()
  recipientName: string;

  @Column()
  recipientBankName: string;

  @Column()
  recipientAccountNumber: string;
  @Column()
  notes: string;

  @Column({ default: 'Pending' })
  status: string;
}
