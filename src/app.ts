import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import helmet from "helmet";
import loanRoutes from "./v1/routes/loanRoutes";
import { errorHandler } from "./v1/middleware/errorHandler";
import { logger } from "./v1/middleware/logger";

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/v1", loanRoutes);

app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});