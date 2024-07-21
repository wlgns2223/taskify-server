import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';
import { TokenService } from '../../src/auth/token.service';
import { UserBuilder } from '../builder/user.builder';
import { EntityAlreadyExists } from '../../src/users/exceptions/entity.exception';
import { User } from '../../src/users/users.model';
import { InvalidInputException } from '../../src/common/exceptions/exceptions';

const createUserMock = jest.fn();
const findUserByEmailMock = jest.fn();
const signAccessTokenMock = jest.fn();
const signRefreshTokenMock = jest.fn();
const saveRefreshTokenMock = jest.fn();

describe('auth service', () => {
  let usersService: UsersService;
  let tokenService: TokenService;
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            createUser: createUserMock,
            findUserByEmail: findUserByEmailMock,
          } as Partial<UsersService>,
        },
        {
          provide: TokenService,
          useValue: {
            signAccessToken: signAccessTokenMock,
            signRefreshToken: signRefreshTokenMock,
            saveRefreshToken: saveRefreshTokenMock,
          } as Partial<TokenService>,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    tokenService = module.get<TokenService>(TokenService);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(tokenService).toBeDefined();
  });

  it("should create an user when calling 'signUp' method", async () => {
    const email = 'fakeEmail';
    const nickname = 'fakeNickName';
    const password = 'fakePassword';

    const expectedUser = new UserBuilder()
      .withEmail(email)
      .withNickName(nickname)
      .withPassword(password)
      .build();
    createUserMock.mockResolvedValue(expectedUser);

    const actual = await authService.signUp(email, nickname, password);
    expect(actual).toEqual(expectedUser);
  });

  it("should fail to create an user when calling 'signUp' method \
    if an user already exists with the given email", async () => {
    const email = 'fakeEmail';
    const nickname = 'fakeNickName';
    const password = 'fakePassword';

    createUserMock.mockRejectedValue(EntityAlreadyExists());

    await expect(authService.signUp(email, nickname, password)).rejects.toThrow(
      EntityAlreadyExists(),
    );
  });

  it('should return access token and refresh token', async () => {
    const fakeEmail = 'fakeEmail';
    const fakePassword = 'fakePassword';
    const fakeUser = new UserBuilder()
      .withEmail(fakeEmail)
      .withPassword(fakePassword)
      .build();
    findUserByEmailMock.mockResolvedValue(fakeUser);

    const fakeAccessToken = 'fakeAccessToken';
    signAccessTokenMock.mockResolvedValue(fakeAccessToken);

    const fakeRefreshToken = 'fakeRefreshToken';
    signRefreshTokenMock.mockResolvedValue(fakeRefreshToken);

    saveRefreshTokenMock.mockResolvedValue(undefined);

    const actual = await authService.signIn(fakeEmail, fakePassword);

    expect(actual).toEqual({
      accessToken: fakeAccessToken,
      refreshToken: fakeRefreshToken,
    });

    expect(findUserByEmailMock).toHaveBeenCalledWith(fakeEmail);
    expect(signAccessTokenMock).toHaveBeenCalledWith(fakeEmail);
    expect(signRefreshTokenMock).toHaveBeenCalledWith(fakeEmail);
    expect(saveRefreshTokenMock).toHaveBeenCalledWith(
      fakeUser.id,
      fakeRefreshToken,
    );
  });

  it("should throw an error when calling 'signIn' method if the password is unmatched", async () => {
    const user = new UserBuilder().build();
    const differentPassword = 'differentPassword';
    const wrongUser: ReturnType<typeof user.toJSON> = {
      ...user.toJSON(),
      password: differentPassword,
    };
    findUserByEmailMock.mockResolvedValue(wrongUser);

    await expect(authService.signIn(user.email, user.password)).rejects.toThrow(
      InvalidInputException('Invalid password'),
    );
  });
});
