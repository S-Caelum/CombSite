import { prisma } from "./prisma"

export const getAllServices = await prisma.service.findMany({
  include: {
    ServiceCategory: true,
  },
});