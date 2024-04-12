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

