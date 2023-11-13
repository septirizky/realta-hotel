import {body, param} from "express-validator";
import models from "../../model/init-models.js";

export const createDepartmentValidation = [
    body('dept_name').notEmpty().withMessage('Nama Departement wajib diisi')
];