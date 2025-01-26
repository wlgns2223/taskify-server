import { User, UserProperties } from '../../src/users/users.entity';

describe('user model test suites', () => {
  let user: User;
  const userProperties: UserProperties = {
    id: 1,
    email: 'fakeEmail@emgail.com',
    nickname: 'fakeNickname',
    password: 'fakePassword',
    teamId: 1,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  beforeEach(() => {
    user = new User(userProperties);
  });

  it('should be defined', () => {
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(User);
  });

  it("should give same id as it's set", () => {
    expect(user.id).toBe(userProperties.id);
  });

  it('should set new id and return it', () => {
    const newId = 2;
    user.id = newId;
    expect(user.id).toBe(newId);
  });

  it("should return json object with user's properties", () => {
    const json = user.serialize<UserProperties>();
    expect(json).toEqual(userProperties);
  });

  it('should create a new instance of User with given properties', () => {
    const newUser = User.from<User, UserProperties>(User, userProperties);
    expect(newUser).toBeDefined();
    expect(newUser).toBeInstanceOf(User);
    expect(newUser.id).toBe(userProperties.id);
  });

  it("should compare password and return true if it's correct", () => {
    expect(user.comparePassword(userProperties.password)).toBeTruthy();
    expect(user.comparePassword('wrongPassword')).toBeFalsy();
  });
});
