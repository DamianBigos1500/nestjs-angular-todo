import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private repo: Repository<TodoEntity>,
  ) {}

  async getAllTodos() {
    return await this.repo.find();
  }

  async createTodo(title: string, description: string) {
    const todo = new TodoEntity();
    TodoEntity.title = title;
    TodoEntity.description = description;
    TodoEntity.status = TodoStatus.OPEN;

    this.repo.create(todo);
    return await this.repo.save(todo);
  }
}
