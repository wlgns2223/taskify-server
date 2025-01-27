import { instanceToPlain } from 'class-transformer';
import { User, UserEntity } from '../users.entity';
import { UserDTO } from './user.dto';
import { PlainOf } from '../../common/types';

export class UserMapper {
  static toDTO(entity: UserEntity): PlainOf<UserDTO> {
    const userDto = UserDTO.from(entity);
    return instanceToPlain(userDto) as PlainOf<UserDTO>;
  }

  static toEntityList(plain: User[]): UserEntity[] {
    return plain.map((user) => UserEntity.from<UserEntity, User>(UserEntity, user));
  }

  static toEntity(plain: User): UserEntity {
    return UserEntity.from<UserEntity, User>(UserEntity, plain);
  }
}
