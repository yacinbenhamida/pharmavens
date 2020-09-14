import { User } from './user.model';

export interface Disponibilite{
    id: number,
    intitule : string,
    remarques : string,
    date_debut : Date,
    date_fin :Date,
    user : User
    createdAt: Date,
    updatedAt: Date,
}