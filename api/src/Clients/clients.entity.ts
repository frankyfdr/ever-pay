import { PaymentsEntity } from 'src/Payments/payment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  bankAccount: string;

  @OneToMany(() => PaymentsEntity, (payment) => payment.client)
  payments: PaymentsEntity[];
}
