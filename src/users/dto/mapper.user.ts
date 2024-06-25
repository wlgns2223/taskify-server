import { instanceToPlain } from 'class-transformer';
import { User } from '../users.model';
import { UserDto } from './user.dto';

export class UserMapper {
  static toDto(entity: User): UserDto {
    const userDto = new UserDto(entity);
    return instanceToPlain(userDto) as UserDto;
  }
}
