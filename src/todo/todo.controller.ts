import { TodoService } from './todo.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  //http GET verb
  @Get()
  getAllTodos() {
    // console.log(this.todoService.getAllTodos());
    return this.todoService.getAllTodos();
  }

  @Post()
  createNewTodos(@Body() data) {
    const { title, description } = data;
    // console.log(this.todoService.getAllTodos());
    return this.todoService.createTodo(title, description);
  }
}
