import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller({})
export class TasksController {

    constructor(
        private tasksService: TasksService
    ) {
        this.tasksService = tasksService
    }

    @Get('tasks')
    getAllTasks() {
        // Buscar en bd
        // Petición a otro api
        return this.tasksService.getAllTasks();
    }

    @Post('/tasks')
    createTask() {
        return 'task created'
    }

    

    @Put('/tasks')// {name: 'task1', status: 'pending'}
    UpdateTask() {
        return 'task updated'
    }

    @Delete('/tasks')
    DeleteTask() {
        return 'task deleted'
    }

    @Patch('/tasks') // {status: 'pending'}
    UpdateTaskStatus() {
        return 'status patched'
    }
    
}