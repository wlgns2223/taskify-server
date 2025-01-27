import { Member, MemberEntity } from './members.entity';

export class MembersMapper {
  static toEntity(param: Member) {
    return MemberEntity.from<MemberEntity, Member>(MemberEntity, param);
  }

  static toEntityList(param: Member[]) {
    return param.map((member) => MemberEntity.from<MemberEntity, Member>(MemberEntity, member));
  }
}
