import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { ClientEntity } from './clients.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async createClient(
    createClientDto: CreateClientDto,
  ): Promise<CreateClientDto> {
    return await this.clientRepository.save(createClientDto);
  }

  async findAll(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  findOne(id: FindOneOptions<ClientEntity>): Promise<ClientEntity> {
    return this.clientRepository.findOne(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
