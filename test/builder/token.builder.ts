import { RefreshToken } from '../../src/auth/refresh-token.model';

export class TokenBuilder {
  #token: RefreshToken;
  constructor() {
    this.#token = new RefreshToken(1, 'fakeRefreshToken', 'fakeExpireAt');
  }

  withUserId(userId: number): TokenBuilder {
    this.#token.userId = userId;
    return this;
  }

  withToken(token: string): TokenBuilder {
    this.#token.token = token;
    return this;
  }

  withId(id: number): TokenBuilder {
    this.#token.id = id;
    return this;
  }

  withExpiresAt(expiresAt: string): TokenBuilder {
    this.#token.expiresAt = expiresAt;
    return this;
  }

  withCreatedAt(createdAt: string): TokenBuilder {
    this.#token.createdAt = createdAt;
    return this;
  }

  withUpdatedAt(updatedAt: string): TokenBuilder {
    this.#token.updatedAt = updatedAt;
    return this;
  }

  build(): RefreshToken {
    return this.#token;
  }
}
