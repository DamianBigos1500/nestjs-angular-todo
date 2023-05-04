import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TodoEntity } from './todo.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

export enum TodoStatus {
  OPEN = 'OPEN',
  WIP = 'WIP',
  COMPLETED = 'COMPLETED',
}
