import { plainToInstance } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../users.entity';

export class SignUpDto implements User {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;

  comparePassword(): boolean {
    return this.password === this.passwordConfirm;
  }

  static from(dto: SignUpDto): SignUpDto {
    return plainToInstance(SignUpDto, dto);
  }
}
