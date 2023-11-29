import "dotenv/config.js";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 7200;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
