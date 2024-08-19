import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

//Import Router
import userRoutes from "./routes/userRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
// import topicRoutes from "./routes/topicRoutes.js";
// import subtopicRoutes from "./routes/subtopicRoutes.js";
// import questionRoutes from "./routes/questionRoutes.js";

const app = express();

//Global Middleware
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: true })); //แปลงข้อมูลที่ซับซ้อนกว่าได้ เช่น array object ที่ซ็อนกัน

//Router
app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);
// app.use("/api/topics", topicRoutes);
// app.use("/api/subtopics", subtopicRoutes);
// app.use("/api/questions", questionRoutes);

export default app;
