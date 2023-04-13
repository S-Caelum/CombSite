import { prisma } from "./prisma"

export const getServices = await prisma.service.findMany({
  where: {
    IsActual: true
  },
  include: {
    ServiceCategory: true
  },
});

export const getEmployees = await prisma.employee.findMany({
  select: {
    Id: true,
    FirstName: true,
    LastName: true,
    Patronymic: true,
  }
});

export const getCategories = await prisma.category.findMany();