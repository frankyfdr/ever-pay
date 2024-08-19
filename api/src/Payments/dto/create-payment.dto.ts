import { ClientEntity } from 'src/clients/clients.entity';
import { DeepPartial } from 'typeorm';

export class CreatePaymentDto {
  id?: number;
  clientId: DeepPartial<ClientEntity>;
  amount: number;
  recipientName: string;
  recipientAccountNumber: string;
  recipientBankName: string;
  notes?: string;
}
