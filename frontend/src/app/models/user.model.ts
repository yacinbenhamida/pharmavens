import { Vehicule } from './vehicule.model';

export interface User{
    id: number
    nom: string
    prenom:string
    cin :string
    date_naissance : Date
    adresse :string
    adresse_actuelle : string
    banque : string
    rib_bancaire :string
    diplome : string
    matricule_cnss : string
    vehicule : Vehicule
    imageUrl : string
    email:string
    emailPerso : string
    password:string
    isActivated:boolean
    type_contrat : string
    salaire : number
    frais : number
    sexe : string
    role:string
    telephone : string
    telephone_perso : string
    date_debut_contrat : Date
    date_fin_contrat :Date
    last_login:Date
    status: string
    about:string
    createdAt:Date
    updatedAt: Date
}