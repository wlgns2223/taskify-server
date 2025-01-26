import { plainToInstance } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  static from(dto: SignInDto) {
    return plainToInstance(SignInDto, dto);
  }
}
