import { Injectable, Logger } from '@nestjs/common';
import { DBConnectionService } from '../db/db.service';
import { User } from './users.model';

@Injectable()
export class UsersRepository {
  private logger = new Logger(UsersRepository.name);
  constructor(private dbService: DBConnectionService) {}

  private async getData(id: number) {
    const query = `SELECT * FROM users WHERE id = ?`;

    try {
      const result = await this.dbService.select<User>(query, [id]);
      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createUser(user: User) {
    const query = `INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)`;

    try {
      const result = await this.dbService.insert(query, [
        user.email,
        user.nickname,
        user.password,
      ]);

      const insertedUser = await this.getData(result.insertId);

      return insertedUser;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
