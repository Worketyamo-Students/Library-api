import {prisma} from "../prisma/client";
import bcrypt from 'bcryptjs';
export const registerUser = async (nom: string,email: string, motDePasse: string) => {
    //verifions d'abord si l'utililsateur existe:

    const userExist= await prisma.user.findUnique({where: {email}});
    if (userExist) {
     throw new Error("L\'utilisateur existe deja. ");
    }
    // run inside `async` function
    const hashedPassword = await bcrypt.hash(motDePasse,10);
    const newUser = await prisma.user.create({
    data: {
      nom,
      email,
      motDePasse: hashedPassword,
    },
  });
  return newUser
  
  const users = await prisma.user.findMany()
}