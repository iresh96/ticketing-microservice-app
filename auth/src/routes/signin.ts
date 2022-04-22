import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Email/password not valid!");
    }

    const matchPassword = await Password.compare(
      existingUser.password,
      password
    );
    if (!matchPassword) {
      throw new BadRequestError("Email/password not valid!");
    }

    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    //Storing JWT in session
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
