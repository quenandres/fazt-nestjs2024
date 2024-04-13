## Nestjs

Crear proyecto

```bash
nest new app
```

Crear modulo

```bash
nest generate module projects
nest generate mo projects
nest g mo projects
```

#### `Controllers`

```ts
import { Controller, Get } from "@nestjs/common";

@Controller({})
export class TasksController {
    
    @Get('tasks')
    getAllTasks() {
        // Buscar en bd
        // Petición a otro api
        return 'Obteniendo todas las tareas';
    }
}
```

Crear Controller

```bash
nest generate controller projects
nest generate co projects
nest g co projects
#Para crear controlador sin archivo de testing
nest g co projects --no-spec
```

#### `Servicios`

Crear Servicio

```bash
nest generate service projects
nest generate s projects
nest g s projects
#Para crear el servicio sin archivo de testing
nest g s projects --no-spec
```

### Body y query

```ts
@Get()
getTasks(@Query() query: any) {
    // Buscar en bd
    // Petición a otro api
    console.log('query');
    console.log(query);
    
    return this.tasksService.getTasks();
    
}

@Post()
createTask(@Body() task: any) {
    console.log(task);
    return this.tasksService.createTask(task);        
}
```

### Params

```ts
 @Get('/:id')
getTask(@Param('id') id: string) {
    return this.tasksService.getTask(parseInt(id));
}
```

### `DTO - Data transfer object`
Especificicar los datos que se reciben.

Class _CreateTaskDto_

```ts
export interface CreateTaskDto {
    title: string;
    status: string;
}
```

```ts
@Put()// {name: 'task1', status: 'pending'}
UpdateTask(@Body() task: UpdateTaskDto) {
    return this.tasksService.UpdateTask(task);
}
```

Los DTO se pueden extender para realizar validaciones.

### `Validaciones`
_DTO_
```ts
import {
    IsString,
    MinLength
} from 'class-validator';
export class CreateTaskDto {
    @IsString()
    @MinLength(3)
    title: string;
    
    @IsString()
    @MinLength(3)
    description: string;

    status: string;
}
```

_Controller_
```ts
@Post()
@UsePipes(new ValidationPipe())
createTask(@Body() task: CreateTaskDto) {
    console.log(task);
    return this.tasksService.createTask(task);        
}
```

Para configurar globalmente el uso de las validaciones y no hacerlo metodo a metodo en toda la aplicación, se agrega esto en _main.ts_

```ts
app.useGlobalPipes(new ValidationPipe());
```

Para limpiar campos que no son puestos en el dto, se agrega el json

```ts
{
    whitelist: true
}
```

Quedaria

```ts
app.useGlobalPipes(new ValidationPipe({
    whitelist: true
}));
```

### `HTTP STATUS No errors`

Se define el status de la ruta desde el controlador

```ts
@Get('/somethingnew')
@HttpCode(201)
somethingnewPage() {
    return 'Something new';
}

@Get('/notfound')
@HttpCode(404)
notFoundPage() {

}
```

### `PIPES`

Procesa algo y devuelve algo diferente

En este caso lo que muestra es que transforma string a enteros y booleanos
```ts
@Get('ticket/:num')
getNumber( @Param('num', ParseIntPipe) num: number ) {
    return num + 1;
}

@Get('active/:status')
isUserActive( @Param('status', ParseBoolPipe) status: boolean ) {
    console.log(typeof status);
    return status;
}
```

*Crear un pipe*

```bash
nest g pipe hello/pipes/validateuser
```

Genera una clase, tiene una función transform en donde ponemos la logica para cambiar lo que necesitamos.

```ts
import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateuserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const ageNumber = parseInt(value.age.toString(), 10);
    if( isNaN(ageNumber) ) {
      throw new HttpException('Age must be a number', HttpStatus.BAD_REQUEST);
    }

    return { ...value, age: ageNumber };
  }
}
```

### `Guards`


*Crear un guard*

```bash
nest g guard hello/guards/auth
```

Se pueden utilizar para validar sesiones, cabeceras.

## `Middlewares`

*Crear un middleware*

```bash
nest g middleware users/logger
nest g mi users/logger
```

#### Middleware a nivel de modulo
_middleware_

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.originalUrl);
    next();
  }
}
```

_modulo_

```ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}

```

Para usar middleware en rutas especificas

```ts
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes({
        path: 'users',
        method: RequestMethod.GET
      }
    ).apply(AuthMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.POST
    });
  }
}

```