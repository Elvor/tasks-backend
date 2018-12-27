import { Connection, Repository } from 'typeorm';
import { Task } from '../model/Task';

export class TaskService {

    private repository: Repository<Task>;

    public constructor(conn: Connection) {
        this.repository = conn.getRepository(Task);
    }

    public async getById(id: number): Promise<Task> {
        return this.repository.findOne(id);
    }

    public async create(task: Task): Promise<Task> {
        return this.repository.save(task);
    }

    public async getAll() {
        return this.repository.find();
    }
}

export default function getTaskService(conn: Connection): TaskService {
    return new TaskService(conn);
}
