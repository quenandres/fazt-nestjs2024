import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/Create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    
    constructor( private userService: UsersService ) {}

    @ApiTags('users')
    @Get()
    getUSers() {
        return this.userService.getUsers();
    }
    
    @ApiTags('users')
    @Post()    
    createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body);        
    }
}
