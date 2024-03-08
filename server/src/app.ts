import express from 'express';
import Controller from 'controllers/controller';
import loggerMiddleware from 'middleware/logger';
import session from "express-session";
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import MongoConnection from 'db/mongo';
import type { Mongoose } from 'mongoose';

dotenv.config();

class App {
    public app: express.Application;
    public port: number;
    private db: Mongoose;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initialiseDataBase();
        this.initialiseMiddlewares();
        this.initialiseControllers(controllers);
        this.initialiseViews();
    }

    private initialiseMiddlewares() {
        this.app.use(loggerMiddleware);
        this.app.use(cors({
            credentials: true,
        }));
        this.app.use(session({
            secret: process.env.EXPRESS_SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false, httpOnly: false },
        }))
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(passport.authenticate("session"));
        this.app.use(express.json());
    }

    private async initialiseDataBase() {
        this.db = await MongoConnection.getDatabase();
    }

    private initialiseControllers(controllers: Controller[]) {
        controllers.forEach((controller) => this.app.use('/', controller.router));
    }

    private initialiseViews() {
        this.app.use('/', express.static(path.join(__dirname, '../public')));
        this.app.get('/*', (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running in port ${this.port}`);
        })
    }

    public getServer() {
        return this.app;
    }
}

export default App;