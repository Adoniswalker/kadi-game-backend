import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<Partial<User>> {
    // Check if user with the email or phone number already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with this email or phone number already exists.',
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return instanceToPlain(this.userRepository.save(newUser));
  }

  async login(emailOrPhone: string, password: string): Promise<Partial<User>> {
    // Find the user by email or phone number
    const user = await this.userRepository.findOne({
      where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return instanceToPlain(user);
  }
}
