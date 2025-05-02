import { Inject, Injectable } from '@nestjs/common';
import { CommentsService } from './comments.service.provider';
import { CommentsRepository, CommentsRepositoryToken } from '../repository/comments.repository.provider';
import { CreateCommentDTO } from '../dto/createComment.dto';
import { TodoServiceToken, TodosService } from '../../todos/service/todo.provider';
import { UsersService, UsersServiceToken } from '../../users/service/users.provider';
import { EntityNotFoundException } from '../../common/exceptions/exceptions';
import { CommentMapper } from '../dto/comment.mapper';

@Injectable()
export class CommentServiceImpl implements CommentsService {
  constructor(
    @Inject(CommentsRepositoryToken) private commentRepository: CommentsRepository,
    @Inject(TodoServiceToken)
    private todoService: TodosService,
    @Inject(UsersServiceToken)
    private userService: UsersService,
  ) {}

  async create(creatCommentDTO: CreateCommentDTO) {
    const { todoId, writerId } = creatCommentDTO;
    const isValidTodoId = await this.todoService.findOneBy(todoId);
    if (isValidTodoId === null) {
      throw EntityNotFoundException(`todo id by${todoId} not found`);
    }

    const isValidWriterId = await this.userService.findOneBy(writerId);
    if (isValidWriterId === null) {
      throw EntityNotFoundException(`user id by ${writerId} not found`);
    }
    const newComment = CommentMapper.toEntity(creatCommentDTO);

    return await this.commentRepository.createParentComment(newComment);
  }
}
