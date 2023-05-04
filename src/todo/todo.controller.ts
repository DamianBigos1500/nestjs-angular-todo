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
  ValidationPipe,
} from '@nestjs/common';
import { TodoStatus } from 'src/Entity/todo.entity';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  //http GET verb
  @Get()
  getAllTodos() {
    return this.todoService.getAll();
  }

  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto) {
    return this.todoService.create(data);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number,
  ) {
    return this.todoService.update(id, status);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
