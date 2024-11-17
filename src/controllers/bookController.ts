import { Request,Response } from "express";
import { prisma } from "../prisma/client";

export const createBook = async (req:Request, res:Response) =>{
    const {title,author,description,publishYear,ISBN} = req.body;

    try {
        const book = await prisma.book.create({
            data:{
                title,
                author,
                description,
                publishYear,
                ISBN,
            }
        });


    res.status(201).json({
        message: 'Livre créé avec succès',
        book,
      });
    } catch (error) {
        res.status(400).json({
            message:error
        });
    }
}