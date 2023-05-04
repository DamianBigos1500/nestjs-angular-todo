import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async getAllUsers() {
    return await this.repo.find();
  }

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

  async loginUser(userLoginDTO: UserLoginDto) {
    const { username, password } = userLoginDTO;
    const user = await this.repo.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordMatch = user.verifyPassword(password);

    if (isPasswordMatch) {
      const jwtPayload = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });

      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
}
