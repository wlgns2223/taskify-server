import { User } from '../../src/users/users.model';

export class UserBuilder {
  #user: User;
  constructor() {
    this.#user = new User('fakeEmail', 'fakeNickName', 'fakePassword', 'fakeTeamId', 1, 'fakeUpdatedAt');
  }

  withEmail(email: string): UserBuilder {
    this.#user.email = email;
    return this;
  }

  withNickName(nickName: string): UserBuilder {
    this.#user.nickname = nickName;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.#user.password = password;
    return this;
  }

  withId(id: number): UserBuilder {
    this.#user.id = id;
    return this;
  }

  withCreatedAt(createdAt: string): UserBuilder {
    this.#user.createdAt = createdAt;
    return this;
  }

  withUpdatedAt(updatedAt: string): UserBuilder {
    this.#user.updatedAt = updatedAt;
    return this;
  }

  build(): User {
    return this.#user;
  }
}
