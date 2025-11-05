import { Prisma, PrismaClient } from "@prisma/client";
declare global{
    namespace globalThis{
        var prisma: PrismaClient ;

    }
};

const prisma = new PrismaClient();

if (process.env.NODE_ENV === 'production') global.prisma ;
export default prisma;
