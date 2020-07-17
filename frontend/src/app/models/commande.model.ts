import { Client } from './client.model';
import { User } from './user.model';

export interface Commande{
    id:number
    prix_total : number
    total_remise : number
    type : string
    client : Client
    emetteur : User
    nb_produits : number
    selectedPackId : number
    grossiteIntermediareId : number
    remise_total_grossite: number
    createdAt:Date
    updatedAt: Date
}