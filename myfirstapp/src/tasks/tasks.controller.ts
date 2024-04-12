import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller('tasks')
export class TasksController {

    constructor(
        private tasksService: TasksService
    ) {
        this.tasksService = tasksService
    }

    @Get()
    getTasks(@Query() query: any) {
        // Buscar en bd
        // Petición a otro api
        console.log('query');
        console.log(query);
        
        return this.tasksService.getTasks();
        
    }

    @Get('/:id')
    getTask(@Param('id') id: string) {
        return this.tasksService.getTask(parseInt(id));
    }

    @Post()
    createTask(@Body() task: CreateTaskDto) {
        console.log(task);
        return this.tasksService.createTask(task);        
    }
    

    @Put()// {name: 'task1', status: 'pending'}
    UpdateTask(@Body() task: UpdateTaskDto) {
        return this.tasksService.UpdateTask(task);
    }

    @Delete()
    DeleteTask() {
        return this.tasksService.deleteTask();
    }

    @Patch() // {status: 'pending'}
    UpdateTaskStatus() {
        return this.tasksService.UpdateTaskStatus();
    }
}