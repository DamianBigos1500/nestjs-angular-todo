import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Damian',
  database: 'nestjs',
  autoLoadEntities: true,
  entities: [],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
