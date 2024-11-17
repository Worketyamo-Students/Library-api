import { Request,Response } from "express"
import { prisma } from "../prisma/client";

export const createBorrow = async (req:Request, res:Response){
    const {livreID,userID} = req.body;

    try {
        const borrow  = await prisma.borrow.create({
            data:{
                livreID,
                userID,
            }
        });

        res.status(201).json({
            message:'Livre emprunté avec succes',
            borrow,
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
};