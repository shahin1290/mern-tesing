import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import errorMiddleware from './middleware/error.middleware';
import Controller from './utils/interfaces/controller.interface';

class App {
    public express: Application;
    public port: number;
    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.intialiseControllers(controllers);
        this.initialiseErrorHandling();
    }
    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private intialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_URI } = process.env;

        mongoose
            .connect(`${MONGO_URI}`)
            .then(() => {
                console.info('Successfully connected to database.');
            })
            .catch((error) => {
                console.error('Error connecting to database', error);
                return process.exit(1);
            });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`);
        });
    }
}

export default App;
