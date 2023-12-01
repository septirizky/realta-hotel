import { Router } from "express";

import restoRouters from "../modules/resto/resto.routes.js"

const router = Router();


router.use(restoRouters)

export default router;
