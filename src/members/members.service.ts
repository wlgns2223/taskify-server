import { Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { CreateMemberDto } from './dto/createMember.dto';
import { Member } from './members.model';

@Injectable()
export class MembersService {
  constructor(private membersRepository: MembersRepository) {}

  async createMember(createMemberDto: CreateMemberDto) {
    const newMember = new Member(createMemberDto.dashboardId, createMemberDto.memberId);
    return this.membersRepository.createMember(newMember);
  }

  async getMembersByDashboardId(dashboardId: number) {
    return await this.membersRepository.getMembersByDashboardId(dashboardId);
  }
}
