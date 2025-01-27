import { Provider } from '@nestjs/common';
import { OffsetPaginationRequestDto } from '../../dashboard/dto/offsetPagination.dto';
import { Invitation, InvitationEntity, InvitationStatus } from '../invitations.entity';
import { InvitationsRepositoryImpl } from './invitations.repositoryImpl';

export interface InvitationsRepository {
  create(invitation: Invitation): Promise<InvitationEntity>;
  countAllBy(email: string): Promise<number>;
  findAllByWithPagination(
    offsetPaginationRequestDTO: OffsetPaginationRequestDto,
    email: string,
  ): Promise<InvitationEntity[]>;

  updateOneBy(id: number, status: InvitationStatus): Promise<InvitationEntity>;
}
export const InvitationsRepositoryToken = Symbol('InvitationsRepositoryToken');

export const InvitationsRepositoryProvider: Provider<InvitationsRepository> = {
  provide: InvitationsRepositoryToken,
  useClass: InvitationsRepositoryImpl,
};
