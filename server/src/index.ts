import express, {Express, Request, Response} from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express server');
});

app.listen(8000, () => {
  console.log('server is running');
});
