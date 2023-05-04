import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @MaxLength(15, { message: 'Max length is 15 characters' })
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Min password length is 8 characters' })
  password: string;
}
