import { Router } from "express";
import { master } from "./master.controllers.js";

const masterRouters = Router();

masterRouters.get("/master", master);

export default masterRouters;
