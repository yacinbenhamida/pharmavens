import { Produit } from './produit.model';
import { User } from './user.model';

export interface Veille {
    id: number
    lib_prod: string
    labo :string
    presentation : string
    prix : number,
    composition : string
    nb_boites_vendues: number,
    partenaires : string,
    actions :string,
    posologie :string,
    commentaires :string,
    produit : Produit
    produitCible:Produit
    analyseur : User
    createdAt: Date
    updatedAt: Date
}