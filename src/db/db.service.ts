import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryResult, ResultSetHeader, createPool, type Pool } from 'mysql2/promise';
import { RowQueryResult } from './types';

type Maybe<T> = T | undefined;

@Injectable()
export class DBConnectionService implements OnModuleInit {
  private pool: Pool;
  private readonly logger = new Logger(DBConnectionService.name);
  constructor(private configService: ConfigService) {}
  async onModuleInit() {
    this.pool = createPool({
      host: this.configService.get('DB_HOST'),
      user: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
    });
  }

  private async query<T = any>(sql: string, values?: any): Promise<T> {
    const conn = await this.pool.getConnection();

    try {
      const [rows, ...rest] = await conn.execute(sql, values);

      return rows as T;
    } catch (error) {
      this.logger.error('Query: ' + sql);
      this.logger.error('Values: ' + values);
      this.logger.error(error);
      throw new Error(error);
    } finally {
      conn.release();
    }
  }

  async insert(sql: string, values?: any): Promise<ResultSetHeader> {
    const result = await this.query<ResultSetHeader>(sql, values);
    return result;
  }

  async select<T = any>(sql: string, values?: any) {
    const result = await this.query<T[]>(sql, values);
    return result;
  }

  async delete(sql: string, values?: any) {
    const result = await this.query<ResultSetHeader>(sql, values);
    return result;
  }

  async update(sql: string, values?: any) {
    const result = await this.query<ResultSetHeader>(sql, values);
    return result;
  }

  async transaction<T>(queries: () => T) {
    const conn = await this.pool.getConnection();
    await conn.beginTransaction();

    try {
      const result = await queries();
      await conn.commit();
      return result;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}
