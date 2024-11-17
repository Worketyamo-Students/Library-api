import app from "./app";
import {prisma} from './prisma/client';

const PORT = process.env.PORT || 3000;

(async ()=>{
    try {
        await prisma.$connect();
        console.log('Connecté a la base de données');

        app.listen(PORT,()=>{
            console.log(`Serveur en cours d\'exécution sur le port ${PORT}`);
        })
    } catch (error) {
        console.error('Erreur lors de la cnnecion a la base de donnees',error);
        process.exit(1);
    }
})();