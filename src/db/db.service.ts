import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoolConnection, ResultSetHeader, createPool, type Pool } from 'mysql2/promise';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class DBConnectionService {
  private transactionConnection = 'conn';
  private pool: Pool;
  private readonly logger = new Logger(DBConnectionService.name);

  constructor(
    private configService: ConfigService,
    private cls: ClsService,
  ) {
    this.pool = createPool({
      host: this.configService.get('DB_HOST'),
      user: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
    });
  }

  private async query<T = any>(sql: string, values?: any): Promise<T> {
    const transactionConn = this.cls.get<PoolConnection | null>(this.transactionConnection);
    const _conn = transactionConn ?? (await this.pool.getConnection());

    try {
      const [rows, ...rest] = await _conn.execute(sql, values);

      return rows as T;
    } catch (error) {
      this.logger.error('Query: ' + sql);
      this.logger.error('Values: ' + values);
      this.logger.error(error);
      throw new Error(error);
    } finally {
      _conn.release();
    }
  }
  async select<T = any>(sql: string, values?: any) {
    const result = await this.query<T[]>(sql, values);
    return result;
  }

  async mutate(sql: string, values?: any, conn?: PoolConnection) {
    const result = await this.query<ResultSetHeader>(sql, values);
    return result;
  }

  async transaction<T>(queries: () => Promise<T>) {
    return await this.cls.run(async () => {
      const conn = await this.pool.getConnection();
      await conn.beginTransaction();
      this.cls.set<PoolConnection>(this.transactionConnection, conn);

      try {
        const result = await queries();
        await conn.commit();
        return result;
      } catch (error) {
        this.logger.error('Transaction Error Rollback');
        await conn.rollback();
        throw error;
      } finally {
        this.cls.set<PoolConnection>(this.transactionConnection, null);
        conn.release();
      }
    });
  }
}
