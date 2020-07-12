export interface Produit{
    id: number,
    libelle: string
    image_url : string
    description : string
    prix : number
    nb_gellules : number
    guide_gamme:string
    fiche_poso :string
    composition : string
    etude_cliniques :string
    times_sold: number
    createdAt: Date
    updatedAt: Date
}