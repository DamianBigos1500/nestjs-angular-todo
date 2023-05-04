import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/DTO/userLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Post('register')
  registration(@Body(ValidationPipe) regDTO: RegisterUserDto) {
    return this.authService.registerUser(regDTO);
  }

  @Post('login')
  signIn(@Body(ValidationPipe) loginDTO: UserLoginDto) {
    return this.authService.loginUser(loginDTO);
  }
}
