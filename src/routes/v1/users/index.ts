import { User } from "@prisma/client";
import express from "express";
import usersControllers from "../../../controllers/users-controllers";

const router = express.Router();

// GET - obter dados
// POST - criar dados
// PUT - atualizar um dado
// PATCH - atualizar um dado simples
// DELETE - remover um dado

router.get("/users/me", async (req, res) => {
  const id = (req as any).authUserId;
  try {
    const user = await usersControllers.find(id);
    return res.json({ user });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Não foi possível obter os dados do usuário." });
  }
});

export default router;
