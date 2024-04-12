import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/Create-user.dto';

@Controller('users')
export class UsersController {
    
    constructor( private userService: UsersService ) {}

    @Get()
    getUSers() {
        return this.userService.getUsers();
    }

    @Post()    
    createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body);        
    }
}
