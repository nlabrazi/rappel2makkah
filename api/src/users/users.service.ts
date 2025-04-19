import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CreateUserDto} from './create-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {email},
    });
  }
}
