import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import usersControllers from "./users-controllers";
import * as jwt from "jsonwebtoken";

class AuthController {
  async signUp(user: User) {
    return await usersControllers.save(user);
  }

  async signIn(email: string, password: string) {
    const user = await usersControllers.getUserByEmail(email);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET || "secret",
          { expiresIn: "1h" }
        );
        return token;
      }
    }
    return undefined;
  }
}

export default new AuthController();
