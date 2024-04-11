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