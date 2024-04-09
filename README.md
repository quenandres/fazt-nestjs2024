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