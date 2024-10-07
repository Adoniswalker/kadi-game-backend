import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(
      registerUserDto.email,
      registerUserDto.phoneNumber,
      registerUserDto.password,
    );
  }
  @Post('login')
  async login(
    @Body('emailOrPhone') emailOrPhone: string,
    @Body('password') password: string,
  ) {
    return this.userService.login(emailOrPhone, password);
  }
}
