import { Injectable } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { Invitation } from './invitations.model';

@Injectable()
export class InvitationsRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT
    id,
    invitee_email as inviteeEmail,
    inviter_id as inviterId,
    dashboard_id as dashboardId,
    status,
    created_at as createdAt,
    updated_at as updatedAt
    FROM invitations
    WHERE id = ?`;

    const result = await this.dbService.select(query, [id]);
    return result;
  }

  async createInvitation(newInvitation: Invitation) {
    const query = `
    insert into invitations (inviter_id, dashboard_id, invitee_email)
    values (?, ?, ?)
    `;
    const result = await this.dbService.insert(query, [
      newInvitation.inviterId,
      newInvitation.dashboardId,
      newInvitation.inviteeEmail,
    ]);
    const insertedInvitation = await this.getData(result.insertId);

    return insertedInvitation[0];
  }

  async getInvitationsByEmail(email: string) {
    const query = `
      SELECT
      I.id as id,
      D.title as title,
      U.nickname as nickname
      FROM invitations AS I
      JOIN dashboards AS D ON D.id = I.dashboard_id
      JOIN users AS U ON U.id = I.inviter_id
      WHERE I.status = "pending" AND I.invitee_email = ?;
      `;
    const result = await this.dbService.select(query, [email]);
    return result;
  }
}
