import { instanceToPlain } from 'class-transformer';
import { CommentDTO } from './comment.dto';
import { Comment, CommentEntity } from '../comments.entity';

export class CommentMapper {
  static toDTO(entity: CommentEntity): CommentDTO {
    const commentDTO = CommentDTO.from(CommentDTO, entity);
    return instanceToPlain(commentDTO) as CommentDTO;
  }

  static toEntity(plain: Comment): CommentEntity {
    return CommentEntity.from<CommentEntity, Comment>(CommentEntity, plain);
  }
}
