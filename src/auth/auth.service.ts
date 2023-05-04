import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async registerUser(registerDTO: RegisterUserDto) {
    const { username, password } = registerDTO;
    const hashed = bcrypt.hashSync(password, 12);

    const user = new UserEntity();
    user.username = username;
    user.password = hashed;
    user.salt = String(12);

    this.repo.create(user);

    try {
      return await this.repo.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
