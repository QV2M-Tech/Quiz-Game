import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

//Import Router
import userRoute from "./routes/userRoute.js";
import scoreRoute from "./routes/scoreRoute.js";
import topicRoute from "./routes/topicRoute.js";
import subtopicRoute from "./routes/subtopicRoute.js";
import questionRoute from "./routes/questionRoute.js";
import score24Route from "./routes/score24Route.js";

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
app.use("/api/users", userRoute);
app.use("/api/scores", scoreRoute);
app.use("/api/topics", topicRoute);
app.use("/api/subtopics", subtopicRoute);
app.use("/api/questions", questionRoute);
app.use("/api/scores24", score24Route);

export default app;
