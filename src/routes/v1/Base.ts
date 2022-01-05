import express from "express";
import UsersRouter from "./users";
import CustomersRouter from "./customers";
import AuthRouter from "./auth";
import { jwtMiddleware } from "../../middlewares/jwt-middleware";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("OK");
});

router.use(AuthRouter);
router.use(jwtMiddleware);
router.use(UsersRouter);
router.use(CustomersRouter);

export default router;
