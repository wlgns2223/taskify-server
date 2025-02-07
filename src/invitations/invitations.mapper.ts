import { instanceToPlain } from 'class-transformer';
import { UserDTO } from '../users/dto/user.dto';
import { InvitationDto, TInvitationDTO } from './dto/invitation.dto';
import { Invitation, InvitationEntity } from './invitations.entity';
import { EntityNotFoundException } from '../common/exceptions/exceptions';

export class InvitationsMapper {
  static toEntity(invitation: Invitation) {
    return InvitationEntity.from<InvitationEntity, Invitation>(InvitationEntity, invitation);
  }

  static toEntityList(invitations: Invitation[]) {
    return invitations.map((invitation) => this.toEntity(invitation));
  }

  static toDTO(invitationEntity: InvitationEntity, userDTO: UserDTO | null) {
    if (!userDTO) {
      throw EntityNotFoundException('User not found');
    }
    const param: TInvitationDTO = {
      id: invitationEntity.id,
      createdAt: invitationEntity.createdAt,
      updatedAt: invitationEntity.updatedAt,
      inviter: userDTO,
      status: invitationEntity.status,
      dashboardId: invitationEntity.dashboardId,
      inviteeEmail: invitationEntity.inviteeEmail,
      inviterId: invitationEntity.inviterId,
    };
    const invitationDTO = InvitationDto.from(InvitationDto, param);

    return instanceToPlain(invitationDTO) as InvitationDto;
  }

  static toDTOList(invitationEntities: InvitationEntity[], userDTO: UserDTO) {
    return invitationEntities.map((invitationEntity) => this.toDTO(invitationEntity, userDTO));
  }
}
