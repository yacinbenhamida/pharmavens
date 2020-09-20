import { User } from './user.model';

export interface Prospet{
    id: number
    type_prospet :string
    nom_complet : string
    budget : number
    localite : string
    specialite : string
    potentiel :string
    produits :string
    details : string
    date_debut : string
    duree : string
    nb_prescription_jour : number
    date_demande : Date
    accord_direction : boolean
    accord_superviseur : boolean
    user : User
    createdAt: Date
    updatedAt: Date
}