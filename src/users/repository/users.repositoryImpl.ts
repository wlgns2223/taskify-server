import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../../db/db.service';
import { UsersRepository } from './users.repository.provider';
import { User } from '../users.entity';
import { UserMapper } from '../dto/user.mapper';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  private logger = new Logger(UsersRepositoryImpl.name);
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT 
    id,email,password,created_at as createdAt, updated_at as updatedAt 
    FROM users 
    WHERE id = ?`;

    const result = await this.dbService.select<User>(query, [id]);
    return result;
  }

  async findManyBy(email: string) {
    const query = `
    select id,email, nickname,password, created_at as createdAt,updated_at as updatedAt 
    FROM users where email = ?`;
    const result = await this.dbService.select<User>(query, [email]);

    return UserMapper.toEntityList(result);
  }

  async findOneBy(email: string) {
    const query = `
    select id,email, nickname,password, created_at as createdAt,updated_at as updatedAt 
    FROM users where email = ?
    limit 1
    `;
    const result = await this.dbService.select<User>(query, [email]);

    return result.length !== 0 ? UserMapper.toEntity(result[0]) : null;
  }

  async create(user: User) {
    const query = `INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)`;

    const result = await this.dbService.mutate(query, [user.email, user.nickname, user.password]);

    const insertedUser = await this.getData(result.insertId);

    return UserMapper.toEntity(insertedUser[0]);
  }
}
