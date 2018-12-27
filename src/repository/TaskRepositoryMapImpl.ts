import {Task} from '../model/Task';
import { TaskRepository } from './TaskRepository';

export class TaskRepositoryMapImpl implements TaskRepository {
    private map: {[key: number]: Task} = {};
    private idGen: number = 1;

    public getById(id: number): Task {
        return this.map[id];
    }

    public save(task: Task): Task {
        if (task.id == null) {
            task.id = this.idGen++;
        }
        this.map[task.id] = task;
        return task;
    }
}
