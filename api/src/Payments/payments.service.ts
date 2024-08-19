import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsEntity } from './payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentsEntity)
    private readonly paymentRepository: Repository<PaymentsEntity>,
  ) {}
  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<CreatePaymentDto> {
    return await this.paymentRepository.save(createPaymentDto);
  }

  findAll(): Promise<PaymentsEntity[]> {
    return this.paymentRepository.find({
      relations: {
        client: true,
      },
    });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id, updatePaymentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
