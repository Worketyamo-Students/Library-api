const jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';
import {Request,Response} from 'express';
import { registerUser } from '../services/userService';
import { prisma } from '../prisma/client';

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
 
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const loginUser = async (req: Request, res: Response) =>{
    const {email, motDePasse} = req.body;

    try {
        //verifions dans mongodb si l'utilisateur exsite
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }
        // si il existe, verifions si le mot de passe qu'il a entrer est le meme que dans la base de donnée
        const isPasswordValid = await bcrypt.compare(motDePasse,user.motDePasse);
        if (!isPasswordValid) {
            return res.status(401).json({message:'Mot de passe incorrect'});
        }

        const token = jwt.sign({id:user.id, email:user.email}, JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({
            Message: 'Connexion réussie',
            token,
        })
    } catch (error) {
        res.status(500).json({message:error});
    }
};

export const logoutUser = (req:Request, res:Response) =>{
    res.status(200).json({message: 'Déconnexion réussi'});
};