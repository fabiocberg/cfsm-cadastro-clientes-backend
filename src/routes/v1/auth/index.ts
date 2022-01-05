import { User } from "@prisma/client";
import express from "express";
import authController from "../../../controllers/auth-controller";
import usersControllers from "../../../controllers/users-controllers";

const router = express.Router();

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authController.signIn(email, password);
    if (token) {
      return res.json({ token });
    } else {
      return res
        .status(500)
        .json({ message: "Usuário ou senha inválidos [1]." });
    }
  } catch (e) {
    return res.status(500).json({ message: "Usuário ou senha inválidos [2]." });
  }
});

router.post("/sign-up", async (req, res) => {
  let user: User = req.body;
  // salvar
  try {
    user = await usersControllers.save(user);
    return res.status(201).json(user);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Não foi possível criar o usuário." });
  }
});

export default router;
