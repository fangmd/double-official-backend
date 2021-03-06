import { IConfig } from './base'

/**
 * 线上测试环境 & 本地 docker 环境
 */
export const testConf: IConfig = {
  port: 3021,
  mysql: {
    host: process.env.DATABASE_HOST || '0.0.0.0',
    port: process.env.DATABASE_PORT || '3306',
    userName: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    dbName: process.env.DATABASE_DB_NAME || 'koa',
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT  || 6379
  }
}
