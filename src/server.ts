import bodyParser from 'body-parser';
import express from 'express';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { typeOrmConfig } from './ormconfig';
import getTaskService from './service/TaskService';

(async () => {
    try {
        const conn = await createConnection(typeOrmConfig);
        console.log('PG connected.');
        const taskService = getTaskService(conn);

        const app = express();
        app.use(bodyParser.json());
        app.get('/:id', async (req, res) =>  {
            const task = await taskService.getById(req.params.id);
            console.log(task);
            res.send(task);
        });
        app.post('/', async (req, res) => {
            console.log(req.body);
            if (req.body == null) {
                res.sendStatus(400);
                return;
            }
            const task = await taskService.create(req.body);
            res.send(task);
        });
        app.get('/', async (req, res) => {
            res.send(await taskService.getAll());
        });

        const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

        process.on('SIGTERM', shutDown);
        process.on('SIGINT', shutDown);

        let connections: any[] = [];

        server.on('connection', (connection) => {
            connections.push(connection);
            connection.on('close', () => connections = connections.filter((curr) => curr !== connection));
        });

        async function shutDown() {
            console.log('Received kill signal, shutting down gracefully');
            server.close(async () => {
                await terminate(0, 'Closed out remaining connections');
            });

            setTimeout(async () => {
                await terminate(1, 'Could not close connections in time, forcefully shutting down');
            }, 10000);

            connections.forEach((curr) => curr.end());
            setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
        }

        async function terminate(code: number, message: string) {
            console.error(message);
            await conn.close();
            console.log('PG connection closed.');
            process.exit(code);
        }
    } catch (e) {
        console.log(e);
    }
})();
