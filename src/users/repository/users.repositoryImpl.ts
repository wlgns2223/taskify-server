import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { User, UserProperties } from '../users.model';
import { UsersRepository } from './users.repository.provider';
import { Serialized } from '../../common/types';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  private logger = new Logger(UsersRepositoryImpl.name);
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
    id,email,password,created_at as createdAt, updated_at as updatedAt 
    FROM users 
    WHERE id = ?`;

    const result = await this.dbService.select<Serialized<User>>(query, [id]);
    return result;
  }

  async findManyBy(email: string) {
    const query = `
    select id,email, nickname,password, created_at as createdAt,updated_at as updatedAt 
    FROM users where email = ?`;
    const result = await this.dbService.select<Serialized<User>>(query, [email]);

    return result.map((user) => User.from<User, UserProperties>(User, user));
  }

  async findOneBy(email: string) {
    const query = `
    select id,email, nickname,password, created_at as createdAt,updated_at as updatedAt 
    FROM users where email = ?
    limit 1
    `;
    const result = await this.dbService.select<Serialized<User>>(query, [email]);

    return result.length !== 0 ? User.from<User, UserProperties>(User, result[0]) : null;
  }

  async create(user: User) {
    const query = `INSERT INTO users (email, nickname, password, team_id) VALUES (?, ?, ?, ?)`;

    const result = await this.dbService.insert(query, [user.email, user.nickname, user.password, user.teamId]);

    const insertedUser = await this.getData(result.insertId);

    return User.from<User, UserProperties>(User, insertedUser[0]);
  }
}
