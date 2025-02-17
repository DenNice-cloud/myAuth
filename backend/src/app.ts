import cors from "cors";
import express from "express";
import { Express, Request, Response } from "express";
import { userRouter } from "./routes/api/user.route";

const PORT = 3031;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Node!");
});

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Now listening on port http://localhost:${PORT}`);
});
