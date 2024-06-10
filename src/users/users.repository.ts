import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { User } from './users.model';

@Injectable()
export class UsersRepository {
  private logger = new Logger(UsersRepository.name);
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT * FROM users WHERE id = ?`;

    const result = await this.dbService.select<User>(query, [id]);
    return result;
  }

  async findUserByEmail(email: string): Promise<User[]> {
    const query = `select id,email, nickname,password, created_at as createdAt,updated_at as updatedAt 
    FROM users where email = ?`;
    const result = await this.dbService.select<User>(query, [email]);

    return result;
  }

  async createUser(user: User) {
    const query = `INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)`;

    const result = await this.dbService.insert(query, [
      user.email,
      user.nickname,
      user.password,
    ]);

    const insertedUser = await this.getData(result.insertId);

    return insertedUser;
  }
}
