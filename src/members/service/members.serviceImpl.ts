import { Injectable } from '@nestjs/common';
import { MembersRepository } from '../repository';
import { MembersService } from './members.service.provider';
import { CreateMemberDto } from '../dto/createMember.dto';
import { MembersMapper } from '../members.mapper';

@Injectable()
export class MembersServiceImpl implements MembersService {
  constructor(private membersRepository: MembersRepository) {}

  async create(createMemberDto: CreateMemberDto) {
    const memberEntity = MembersMapper.toEntity({
      dashboardId: createMemberDto.dashboardId,
      memberId: createMemberDto.memberId,
    });
    return await this.membersRepository.create(memberEntity);
  }

  async findAllBy(dashboardId: number) {
    return await this.membersRepository.findAllBy(dashboardId);
  }
}
