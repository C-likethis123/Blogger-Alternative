import express from 'express';
import Controller from './controllers/controller';

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

    }

    private initialiseControllers(controllers: Controller[]) {
        controllers.forEach((controller) => this.app.use(controller.path, controller.router));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running in port ${this.port}`);
        })
    }
}

export default App;