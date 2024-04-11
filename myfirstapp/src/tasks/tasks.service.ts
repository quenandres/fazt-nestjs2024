import { Injectable } from "@nestjs/common";

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

    createTask(task: any) {
        this.tasks.push(task);
        return 'task created';
    }

    UpdateTask() {
        return 'task updated';
    }

    deleteTask() {
        return 'task deleted';
    }

    UpdateTaskStatus() {
        return 'task status updated';
    }
}