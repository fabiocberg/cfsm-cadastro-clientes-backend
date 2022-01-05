import { Customer, PrismaClient } from "@prisma/client";

class CustomerController {
  async save(userId: number, customer: Customer) {
    if (customer.id > 0) {
      return await this.update(customer);
    } else {
      return await this.insert(userId, customer);
    }
  }

  async insert(userId: number, customer: Customer) {
    const prisma = new PrismaClient();
    try {
      return prisma.customer.create({
        data: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          user: { connect: { id: userId } },
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }

  async update(customer: Customer) {
    const prisma = new PrismaClient();
    try {
      return prisma.customer.update({
        data: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
        where: {
          id: customer.id,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }

  async updatePicture(id: number, pictureUrl: string) {
    const prisma = new PrismaClient();
    try {
      return prisma.customer.update({
        data: {
          pictureUrl: pictureUrl,
        },
        where: {
          id: id,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }

  async fetch(userId: number) {
    const prisma = new PrismaClient();
    try {
      return prisma.customer.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          name: "asc",
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      prisma.$disconnect();
    }
  }
}

export default new CustomerController();
