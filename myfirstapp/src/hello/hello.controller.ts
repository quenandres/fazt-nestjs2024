import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';

@Controller()
export class HelloController {
    @Get()
    index( @Req() request: Request, @Res() response: Response ) {
        console.log(request.url);
        response.status(200).json(
            {message: 'Hello World!'}
        );
    }

    @Get('/somethingnew')
    @HttpCode(201)
    somethingnewPage() {
        return 'Something new';
    }

    @Get('/notfound')
    @HttpCode(404)
    notFoundPage() {

    }

    @Get('/error')
    @HttpCode(500)
    errorPage() {
        return 'Error route';
    }


    @Get('ticket/:num')
    getNumber( @Param('num', ParseIntPipe) num: number ) {
        return num + 1;
    }

    @Get('active/:status')
    isUserActive( @Param('status', ParseBoolPipe) status: boolean ) {
        console.log(typeof status);
        return status;
    }

    @Get('greet')
    greet( @Query(ValidateuserPipe) query: { name: string, age: number } ) {
        console.log(typeof query.name);
        console.log(typeof query.age);
        return `Hello ${query.name}, you are ${query.age - 11} years old.`;
    }
}
