import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Task } from './model/Task';
import { User } from './model/User';

const typeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    // tslint:disable-next-line:object-literal-sort-keys
    schema: 'task'
    host: 'localhost',
    port: 5432,
    username: 'elvor_dev',
    password: 'elvor123',
    database: 'task',
    synchronize: true,
    logging: true,
    entities: [
        User,
        Task,
    ],
};

export { typeOrmConfig };
