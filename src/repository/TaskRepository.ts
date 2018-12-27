import { Task } from '../model/Task';
import { TaskRepositoryMapImpl } from './TaskRepositoryMapImpl';

export interface TaskRepository {
    getById(id: number): Task;
    save(task: Task): Task;
}

export default new TaskRepositoryMapImpl() as TaskRepository;
