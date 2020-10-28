export interface Pack{
    id:number,
    nom_pack: string,
    description :string,
    type_pack : string,
    pourcentage_unite_gratuites_grossiste:number,
    valeur_unite_gratuites_grossiste_ttc : number,
    pourcentage_unite_gratuites_vd : number,
    valeur_unite_gratuites_vd_ttc :number,
    valeur_bon_achat : number,
    remise_total_comptant : number,
    remise_total_dans_un_mois : number,
    prix_total : number
    times_sold : number
    visible : boolean
    createdAt: Date
    updatedAt: Date
}