import { Invitation, InvitationEntity } from './invitations.entity';

export class InvitationsMapper {
  static toEntity(invitation: Invitation) {
    return InvitationEntity.from<InvitationEntity, Invitation>(InvitationEntity, invitation);
  }

  static toEntityList(invitations: Invitation[]) {
    return invitations.map((invitation) => this.toEntity(invitation));
  }
}
