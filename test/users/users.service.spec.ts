import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { UsersRepository } from '../../src/users/users.repository';
import { User } from '../../src/users/users.model';
import type { UserDto } from '../../src/users/dto/user.dto';

type UserInstance = Pick<User, keyof User>;
type UserDtoInstanceType = Pick<UserDto, keyof UserDto>;

const findUserByEmailMock = jest.fn();
const createUserMock = jest.fn();

describe('users uservice', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  const mockDate = new Date(2024, 0, 1);
  const fakeUser: UserInstance = {
    id: 1,
    email: '1',
    nickname: '1',
    password: '1',
    createdAt: mockDate.toISOString(),
    updatedAt: mockDate.toISOString(),
  };

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

  it('should create a user', async () => {
    const fakeEmail = '1';
    const fakeNickname = '1';
    const fakePassword = '1';

    const { password, ...userDto } = fakeUser;
    const expectedUser: UserDtoInstanceType = {
      ...userDto,
      email: fakeEmail,
      nickname: fakeNickname,
    };

    findUserByEmailMock.mockResolvedValue([]);
    const fakeNewUser = new User(fakeEmail, fakeNickname, fakePassword);
    createUserMock.mockResolvedValue(fakeUser);

    const result = await usersService.createUser(
      fakeEmail,
      fakeNickname,
      fakePassword,
    );

    expect(result).toEqual(expectedUser);
    expect(createUserMock).toHaveBeenCalledWith(fakeNewUser);
  });
});
