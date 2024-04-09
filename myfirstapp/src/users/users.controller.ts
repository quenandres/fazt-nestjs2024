import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    
    constructor( private userService: UsersService ) {}

    @Get()
    getUSers() {
        return this.userService.getUsers();
    }
}
