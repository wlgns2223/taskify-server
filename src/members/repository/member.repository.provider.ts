import { symbol } from 'ts-pattern/dist/patterns';
import { Member, MemberEntity } from '../members.entity';
import { Provider } from '@nestjs/common';
import { MembersRepositoryImpl } from './members.repositoryImpl';

export interface MembersRepository {
  create(member: Member): Promise<MemberEntity>;
  findAllBy(dashboardId: number): Promise<MemberEntity[]>;
}

export const MembersRepositoryToken = Symbol('MembersRepositoryToken');

export const MembersRepositoryProvider: Provider<MembersRepository> = {
  provide: MembersRepositoryToken,
  useClass: MembersRepositoryImpl,
};
