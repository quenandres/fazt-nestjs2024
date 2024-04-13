import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/Create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    
    constructor(
        private prisma: PrismaService
    ) {}

    getUsers() {
        return this.prisma.user.findMany();
    }

    createUser(user: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data: user });
    }
}
