import express, {Request, Response} from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import scanRoutes from "./routes/scan.routes.js";
import discoveryRoutes from "./routes/discovery.routes.js";
import projectRoutes from "./routes/project.routes.js"
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Omnix API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/scans", scanRoutes);
app.use("/api/discovery", discoveryRoutes);

export default app;
