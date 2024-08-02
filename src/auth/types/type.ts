// export type TokenType = 'access' | 'refresh';

export const enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export type TokenTypeValues = `${TokenType}`;

export const enum TokenExceptionType {
  INVALID_TOKEN = 'INVALID',
  UNDEFINED = 'UNDEFINED',
  EXPIRED = 'EXPIRED',
}
