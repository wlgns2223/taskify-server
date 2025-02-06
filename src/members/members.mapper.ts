import { instanceToPlain } from 'class-transformer';
import { MemberDTO } from './dto/member.dto';
import { Member, MemberEntity } from './members.entity';

export class MembersMapper {
  static toEntity(param: Member) {
    return MemberEntity.from<MemberEntity, Member>(MemberEntity, param);
  }

  static toEntityList(param: Member[]) {
    return param.map((member) => MemberEntity.from<MemberEntity, Member>(MemberEntity, member));
  }

  static toDTO(param: MemberEntity) {
    const memberDTO = MemberDTO.from(MemberDTO, param);
    return instanceToPlain(memberDTO) as MemberDTO;
  }

  static toDTOList(param: MemberEntity[]) {
    return param.map((member) => MembersMapper.toDTO(member));
  }
}
