import { validationResult } from "express-validator";

export const validatorsError = (req, res, next) => {
  try {
    validationResult(req).throw();

    next();
  } catch (error) {
    res.status(201).json({ message: error.errors[0].msg });
  }
};
