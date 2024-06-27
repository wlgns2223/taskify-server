import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { UsersRepository } from '../../src/users/users.repository';
import { User } from '../../src/users/users.model';
import { UserDto } from '../../src/users/dto/user.dto';
import { ServiceException } from '../../src/common/exceptions/serviceException';

import { UserMapper } from '../../src/users/dto/mapper.user';

type UserDtoInstanceType = Pick<UserDto, keyof UserDto>;

const findUserByEmailMock = jest.fn();
const createUserMock = jest.fn();

describe('users uservice', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  const mockDate = new Date(2024, 0, 1);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            createUser: createUserMock,
            findUserByEmail: findUserByEmailMock,
          } as Partial<UsersRepository>,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  it('UserMapper should convert an user entity to an user dto', () => {
    const fakeEmail = 'test@email.com';
    const fakeNickName = 'fakeNickname';
    const fakePassword = 'fakePassword';
    const fakeId = 1;
    const fakeDate = mockDate.toISOString();

    const user = new User(
      fakeEmail,
      fakeNickName,
      fakePassword,
      fakeId,
      fakeDate,
      fakeDate,
    );

    const expectedDto: UserDtoInstanceType = {
      id: fakeId,
      email: fakeEmail,
      nickname: fakeNickName,
      createdAt: fakeDate,
      updatedAt: fakeDate,
    };

    const actual = UserMapper.toDto(user);

    expect(actual).toEqual(expectedDto);
  });

  it.todo('should find an user by email and return the found user');

  it('should create a user', async () => {
    const fakeId = 1;
    const fakeEmail = 'test@gmail.com';
    const fakeNickname = 'testNicnake';
    const fakePassword = 'testpassword';

    findUserByEmailMock.mockResolvedValue([]);
    const fakeNewUser = new User(
      fakeEmail,
      fakeNickname,
      fakePassword,
      fakeId,
      mockDate.toISOString(),
      mockDate.toISOString(),
    );
    createUserMock.mockResolvedValue(fakeNewUser);

    const expected: UserDtoInstanceType = {
      id: fakeId,
      email: fakeEmail,
      nickname: fakeNickname,
      createdAt: mockDate.toISOString(),
      updatedAt: mockDate.toISOString(),
    };
    const toDtoSpy = jest.spyOn(UserMapper, 'toDto');
    toDtoSpy.mockReturnValue(expected as UserDto);

    const result = await usersService.createUser(
      fakeNewUser.email,
      fakeNewUser.nickname,
      fakeNewUser.password,
    );

    expect(result).toEqual(expected);
    expect(createUserMock).toHaveBeenCalledWith(expect.any(User));
  });

  it('should throw an error if an user exists with the given email', async () => {
    const fakeEmail = '1';
    const fakeNickname = '1';
    const fakePassword = '1';

    const someNickname = 'someNickname';
    const somePassword = 'somePassword';
    const someUser = new User(fakeEmail, someNickname, somePassword);
    findUserByEmailMock.mockResolvedValue([someUser]);

    await expect(
      usersService.createUser(fakeEmail, fakeNickname, fakePassword),
    ).rejects.toThrow(ServiceException);
  });
});
