import "dotenv/config.js";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { fileURLToPath } from 'url';
import path from "path";

const app = express();
const PORT = process.env.PORT || 7200;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")))

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
