import express, {Request, Response} from "express";
import scanRoutes from "./routes/scan.routes.js";
import discoveryRoutes from "./routes/discovery.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Omnix API is running",
  });
});

app.use("/api/scans", scanRoutes);
app.use("/api/discovery", discoveryRoutes)

export default app;
