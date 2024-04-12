import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

export interface User {
    name: string;
    age: number;
}

@Injectable()
export class TasksService {

    private tasks = [];

    getTasks() {
        return this.tasks;
    }

    
    getTask(id: number) {
        const tasksFound = this.tasks.find(task => task.id === id);
        if( !tasksFound ) {
            return new NotFoundException('task not found');
        }

        return tasksFound;
    }

    createTask(task: CreateTaskDto) {

        this.tasks.push({
            ...task,
            id: this.tasks.length + 1
        });
        return 'task created';
    }

    UpdateTask(task: UpdateTaskDto) {
        return 'task updated';
    }

    deleteTask() {
        return 'task deleted';
    }

    UpdateTaskStatus() {
        return 'task status updated';
    }
}