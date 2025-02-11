import { instanceToPlain } from 'class-transformer';
import { InvitationDto, TInvitationDTO } from './dto/invitation.dto';
import { Invitation, InvitationEntity } from './invitations.entity';

export class InvitationsMapper {
  static toEntity(invitation: Invitation) {
    return InvitationEntity.from<InvitationEntity, Invitation>(InvitationEntity, invitation);
  }

  static toEntityList(invitations: Invitation[]) {
    return invitations.map((invitation) => this.toEntity(invitation));
  }

  static toDTO(invitationEntity: InvitationEntity) {
    const param: TInvitationDTO = {
      id: invitationEntity.id,
      createdAt: invitationEntity.createdAt,
      updatedAt: invitationEntity.updatedAt,
      status: invitationEntity.status,
      dashboardId: invitationEntity.dashboardId,
      inviteeEmail: invitationEntity.inviteeEmail,
      inviterId: invitationEntity.inviterId,
      dashboardTitle: invitationEntity.dashboardTitle,
      inviterNickname: invitationEntity.inviterNickname,
    };
    const invitationDTO = InvitationDto.from(InvitationDto, param);

    return instanceToPlain(invitationDTO) as InvitationDto;
  }

  static toDTOList(invitationEntities: InvitationEntity[]) {
    return invitationEntities.map((invitationEntity) => this.toDTO(invitationEntity));
  }
}
