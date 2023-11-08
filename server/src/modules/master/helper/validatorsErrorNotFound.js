import { validationResult } from "express-validator";

export const validatorsErrorNotFound = (req, res, next) => {
  try {
    validationResult(req).throw();

    next();
  } catch (error) {
    res.status(404).json({ message: error.errors[0].msg });
  }
};
