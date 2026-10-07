import express, {Request, Response} from "express";
import scanRoutes from "./routes/scan.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Omnix API is running",
  });
});

app.use("/api/scans", scanRoutes);

export default app;
