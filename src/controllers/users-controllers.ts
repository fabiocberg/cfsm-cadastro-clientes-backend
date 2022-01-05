import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

class UsersController {
  async save(user: User) {
    const prisma = new PrismaClient();

    try {
      const hash = bcrypt.hashSync(
        user.password,
        Number(process.env.BCRYPT_SALT_ROUNDS || 10)
      );
      user.password = hash;
      return await prisma.user.create({
        data: user,
      });
    } catch (e) {
      console.log("usersController save exception: ", e);
      throw e;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getUserByEmail(email: string) {
    const prisma = new PrismaClient();
    try {
      return await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }

  async find(id: number) {
    const prisma = new PrismaClient();
    try {
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (e) {
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }
}

export default new UsersController();
