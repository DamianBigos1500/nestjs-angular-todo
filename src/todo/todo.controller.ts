import { CreateTodoDto } from 'src/DTO/create-todo.dto';
import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodoStatus } from 'src/Entity/todo.entity';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/Entity/user.entity';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  //http GET verb
  @Get()
  getAllTodos(@User() user: UserEntity) {
    return this.todoService.getAll(user);
  }

  @Post()
  createNewTodo(
    @Body(ValidationPipe) data: CreateTodoDto,
    @User() user: UserEntity,
  ) {
    return this.todoService.create(data, user);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    console.log(user.id);
    return this.todoService.update(id, status, user);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number, @User() user: UserEntity) {
    return this.todoService.delete(id, user);
  }
}
