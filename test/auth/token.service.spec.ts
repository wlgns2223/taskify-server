import { Test, TestingModule } from '@nestjs/testing';
import {
  TokenService,
  VerifiedTokenPayLoad,
} from '../../src/auth/token.service';
import { TokenRepository } from '../../src/auth/token.repository';
import { JwtService } from '@nestjs/jwt';
import { UserBuilder } from '../builder/user.builder';
import { TokenBuilder } from '../builder/token.builder';

const signAsyncMock = jest.fn();
const saveRefreshTokenMock = jest.fn();
const verifyAsyncMock = jest.fn();

describe('token service', () => {
  let tokenRepository: TokenRepository;
  let jwtService: JwtService;
  let tokenService: TokenService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: TokenRepository,
          useValue: {
            saveRefreshToken: saveRefreshTokenMock,
          } as Partial<TokenRepository>,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: signAsyncMock,
            verifyAsync: verifyAsyncMock,
          } as Partial<JwtService>,
        },
      ],
    }).compile();
    tokenService = module.get<TokenService>(TokenService);
    tokenRepository = module.get<TokenRepository>(TokenRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
    expect(tokenRepository).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it("shuold sign an access token when calling 'signAccessToken' method", async () => {
    const user = new UserBuilder().build();
    const fakeAccessToken = 'fakeAccessToken';
    const jwtSignAsyncMock = jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValue(fakeAccessToken);

    const token = await tokenService.signAccessToken(user.email);
    expect(token).toEqual(fakeAccessToken);
    expect(jwtSignAsyncMock).toHaveBeenCalledWith(
      { email: user.email },
      { expiresIn: '10s' },
    );
  });

  it("should sign an refresh token when calling 'signRefreshToken' method", async () => {
    const user = new UserBuilder().build();
    const fakeRefreshToken = 'fakeRefreshToken';
    const jwtSignAsyncMock = jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValue(fakeRefreshToken);

    const token = await tokenService.signRefreshToken(user.email);

    expect(token).toEqual(fakeRefreshToken);
    expect(jwtSignAsyncMock).toHaveBeenCalledWith(
      { email: user.email },
      { expiresIn: '10m' },
    );
  });

  it("should save a refresh token when calling 'saveRefreshToken' method", async () => {
    const fakeVerifiedTokenPayload: VerifiedTokenPayLoad = {
      email: 'fakeEmail',
      iat: 1,
      exp: 2,
    };
    verifyAsyncMock.mockResolvedValue(fakeVerifiedTokenPayload);

    const fakeRefreshTokenEntity = new TokenBuilder()
      .withId(1)
      .withCreatedAt('fakeDate')
      .withUpdatedAt('fakeDate')
      .build();

    saveRefreshTokenMock.mockResolvedValue(fakeRefreshTokenEntity);
    const fakeUserId = 1;
    const fakeToken = 'fakeToken';
    const fakeRefreshTokenPayload = new TokenBuilder()
      .withUserId(fakeUserId)
      .withToken(fakeToken)
      .withExpiresAt(fakeVerifiedTokenPayload.exp.toString())
      .build();

    const actual = await tokenService.saveRefreshToken(fakeUserId, fakeToken);

    expect(actual).toEqual(fakeRefreshTokenEntity);
    expect(verifyAsyncMock).toHaveBeenCalledWith(fakeToken);
    expect(saveRefreshTokenMock).toHaveBeenCalledWith(fakeRefreshTokenPayload);
  });
});
