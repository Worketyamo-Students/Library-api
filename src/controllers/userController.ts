import {Request,Response} from 'express';
import { registerUser } from '../services/userService';

export const signupUser = async (req:Request,res:Response) =>{ 
    const {nom,email,motDePasse} = req.body;

    try {
        const user = await registerUser(nom,email,motDePasse);
        res.status(201).json({
            message:'Utilisateur créé avec succès',
            user:{
                id: user.id,
                nom:user.nom,
                email:user.email,
            },
        });
    } catch (error) {
        res.status(400).json({message: error})
    }
}