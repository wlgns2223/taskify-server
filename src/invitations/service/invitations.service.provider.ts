import { Provider } from '@nestjs/common';
import { Invitation, InvitationEntity, InvitationStatus } from '../invitations.entity';
import { InvitationsServiceImpl } from './invitations.serviceImpl';
import { UserEntity } from '../../users/users.entity';

export interface InvitationsService {
  create(
    invitation: Omit<Invitation, 'dashboardTitle' | 'inviterNickname'>,
  ): Promise<{ userEntity: UserEntity; invitationEntity: InvitationEntity }>;
  findAllByWithPagination(
    offsetPaginationRequestDTO: any,
    email: string,
  ): Promise<{ invitations: InvitationEntity[]; user: UserEntity; totalNumberOfInvitations: number }>;
  updateOneBy(id: number, status: InvitationStatus, accessToken: string): Promise<InvitationEntity>;
}

export const InvitationsServiceToken = Symbol('InvitationsServiceToken');

export const InvitationsServiceProvider: Provider<InvitationsService> = {
  provide: InvitationsServiceToken,
  useClass: InvitationsServiceImpl,
};
