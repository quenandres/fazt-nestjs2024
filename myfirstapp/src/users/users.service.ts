import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/Create-user.dto';

@Injectable()
export class UsersService {
    private users: any = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'chris',
            password: 'secret',
        },
        {
            userId: 3,
            username: 'maria',
            password: 'guess',
        },
    ];

    getUsers() {
        return this.users;
    }

    createUser(user: CreateUserDto) {
        const new_user = {
            id: this.users.length + 1,
            ...user
        }

        this.users.push(new_user);

        return user;

    }
}
