import { instanceToPlain } from 'class-transformer';
import { User, UserEntity } from '../users.entity';
import { UserDTO } from './user.dto';
import { PlainOf } from '../../common/types';

export class UserMapper {
  static toDTO(entity: UserEntity | null): UserDTO | null {
    if (!entity) {
      return null;
    }
    const userDto = UserDTO.from(UserDTO, entity);
    return instanceToPlain(userDto) as UserDTO;
  }

  static toEntityList(plain: User[]): UserEntity[] {
    return plain.map((user) => UserEntity.from<UserEntity, User>(UserEntity, user));
  }

  static toEntity(plain: User): UserEntity {
    return UserEntity.from<UserEntity, User>(UserEntity, plain);
  }
}
