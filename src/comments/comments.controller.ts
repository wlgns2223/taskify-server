import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommentsService, CommentsServiceToken } from './service/comments.service.provider';
import { CreateCommentDTO } from './dto/createComment.dto';
import { CommentMapper } from './dto/comment.mapper';

@Controller('comments')
export class CommentsController {
  constructor(@Inject(CommentsServiceToken) private commentService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDTO: CreateCommentDTO) {
    const comment = await this.commentService.create(createCommentDTO);

    return CommentMapper.toDTO(comment);
  }
}
