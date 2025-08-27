import express, {
  Application,
  json,
  Request,
  Response,
  urlencoded,
} from "express";
import cors from "cors";
import UserRoute from "./routes/user.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const PORT = 8000;

export default class App {
  private app: Application;

  constructor() {
    this.app = express();

    this.configure();
    this.initalizeRoutes();
    this.initializeErrorHandling();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(express.static("public"));
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initalizeRoutes(): void {
    this.app.get("/", (_req: Request, res: Response) => {
      res.status(200).send("Hello JCWDOH01-003");
    });

    this.app.use("/users", new UserRoute().router);
  }

  public start(): void {
    this.app.listen(PORT, () =>
      console.log(`[API] Local: http://localhost:${PORT}/`)
    );
  }
}
