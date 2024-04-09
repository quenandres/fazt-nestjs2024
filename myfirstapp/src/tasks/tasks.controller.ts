import { Controller, Get } from "@nestjs/common";
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

    
}