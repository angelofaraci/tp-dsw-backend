import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import { reviewRouter } from "./review/review.routes.js";
import { gameRouter } from "./game/game.routes.js";
import { userRouter } from "./user/user.routes.js";
import { adminRouter } from "./admin/admin.routes.js";
import { levelingRouter } from "./leveling/leveling.routes.js";
import { companyRouter } from "./company/company.routes.js";

//database initialization

mongoose
  .connect("mongodb://localhost/tp-database", {})
  .then((db) => console.log("Database is Connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

//routers

app.use("/api/reviews", reviewRouter);
app.use("/api/games", gameRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/leveling", levelingRouter);
app.use("/api/company", companyRouter);

//sever start

app.use((_, res) => {
  return res.status(404).send({ message: "Resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server runnning on http://localhost:${PORT}/`);
});

export default app