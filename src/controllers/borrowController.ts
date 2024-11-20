import { Request,Response } from "express";
import { prisma } from "../prisma/client";
import { StatusCodes } from "http-status-codes";

export const borrowBook = async (req:Request, res:Response) =>{
    try {
        const {livreID,userID} = req.body;

        const book = await prisma.book.findUnique({
            where:{id:livreID},
        });
        if (!book) {
            res.status(StatusCodes.NOT_FOUND).json({
                message:"Livre non Trouvé."
            });
            return;
        }
        if (book.etat === "emprunté") {
            res.status(StatusCodes.BAD_REQUEST).json({message:"Le Livre est deja emprunté"});
            return;
        }
        //Je peut maintenant creer l'emprunt
        const loan = await prisma.borrow.create({
            data:{
                livreID,
                userID,
                dateEmprunt: new Date(),
            },
        });
        //Bien sur je met a jour son etat
        await prisma.book.update({
            where:{id:livreID},
            data:{etat: "emprunté"},
        });

        res.status(StatusCodes.CREATED).json({
            message:"Livre emprunté avec succès",
            loan: loan,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:"Erreur lors de l'emprunt."
        });
    }
};

export const returnBook = async (req:Request, res:Response) =>{
    try {
        const {id} = req.params;

        const borrow = await prisma.borrow.findUnique({
            where: {id},
        });
        if (!borrow) {
            res.status(StatusCodes.NOT_FOUND);
        }
        await prisma.book.update({
            where:{id: borrow?.livreID},
            data:{etat:"disponible"},
        });

        const updatedBorrow = await prisma.borrow.update({
            where: {id},
            data: {dateRetour: new Date() },
        });

        res.status(StatusCodes.OK).json({
            message:"Livre retourné avec succès",
            borrow: updatedBorrow,
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"Erreur lors du retour du  livre"
        });
    }
};

