import { Controller, Get, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/hello')
export class HelloController {
    @Get()
    index( @Req() request: Request, @Res() response: Response ) {
        console.log(request.url);
        response.status(200).json(
            {message: 'Hello World!'}
        );
        
    }
}
