import { Provider } from '@nestjs/common';
import { Member, MemberEntity } from '../members.entity';
import { MembersServiceImpl } from './members.serviceImpl';

export interface MembersService {
  create(member: Member): Promise<MemberEntity>;
  findAllBy(dashboardId: number): Promise<MemberEntity[]>;
}

export const MemberServiceToken = Symbol('MemberServiceToken');

export const MemberServiceProvider: Provider<MembersService> = {
  provide: MemberServiceToken,
  useClass: MembersServiceImpl,
};
