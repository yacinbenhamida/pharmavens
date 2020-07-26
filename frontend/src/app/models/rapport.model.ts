export interface Rapport{
    id: number,
    type_rapport :string,
    semaine_rapport : number,
    date_debut_rapport :Date,
    date_fin_rapport :Date,
    ownerId : number,
    remarques :string,
    objectif_1:number,
    objectif_2:number,
    objectif_total : number,
    objectif_pharmacies_grossiste:number,
    objectif_vente_animatrice :number,
    realise_ventes : any
    jour_ferie : boolean,
    reunion :boolean,
    createdAt: Date
    updatedAt: Date
}