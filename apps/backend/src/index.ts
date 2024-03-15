import express, { Request, Response } from 'express';
import cors from 'cors';

export async function startAppServer(params: {
  port: number,
  staticFolder: string | null
}) {
  const { port = 3333, staticFolder } = params;
  const app = express();

  app.use('/static', (req, res, next) => {
    console.log(res)
    express.static(staticFolder!)(req, res, next); // 使用 express.static 服务
  })

  app.use(express.json());

  // app.use(cors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // }));

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, I\'m Electron Template!');
  });

  app.listen(port, () => {
    console.log(`Nodejs app listening on port ${port}`)
  })

}