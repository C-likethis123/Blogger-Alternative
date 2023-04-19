import express from 'express';
import Controller from './controllers/controller';
import loggerMiddleware from './middleware/logger';
import session from "express-session";
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initialiseMiddlewares();
        this.initialiseControllers(controllers);
    }

    private initialiseMiddlewares() {
        this.app.use(loggerMiddleware);
        this.app.use(cors());
        this.app.use(session({
            secret: process.env.EXPRESS_SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: true }
        }))
        this.app.use(passport.authenticate("session"));
    }

    private initialiseControllers(controllers: Controller[]) {
        controllers.forEach((controller) => this.app.use('/', controller.router));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running in port ${this.port}`);
        })
    }
}

export default App;