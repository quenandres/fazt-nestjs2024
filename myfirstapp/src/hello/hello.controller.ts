import { Controller, Get, HttpCode, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

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
}
