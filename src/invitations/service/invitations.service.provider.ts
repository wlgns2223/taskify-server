import { Provider } from '@nestjs/common';
import { Invitation, InvitationEntity, InvitationStatus } from '../invitations.entity';
import { InvitationsServiceImpl } from './invitations.serviceImpl';
import { OffsetPaginationResponseDto } from '../../dashboard/dto/offsetPagination.dto';

export interface InvitationsService {
  create(invitation: Invitation): Promise<InvitationEntity>;
  findAllByWithPagination(offsetPaginationRequestDTO: any, email: string): Promise<Record<string, any>>;
  updateOneBy(id: number, status: InvitationStatus, accessToken: string): Promise<InvitationEntity>;
}

export const InvitationsServiceToken = Symbol('InvitationsServiceToken');

export const InvitationsServiceProvider: Provider<InvitationsService> = {
  provide: InvitationsServiceToken,
  useClass: InvitationsServiceImpl,
};
