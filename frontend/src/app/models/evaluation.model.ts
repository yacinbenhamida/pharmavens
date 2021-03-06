export interface Evaluation{
    id: number,
    nom_sortie : string,
    date_sortie : Date,
    secteur : string,
    note_globale : number,
    presentation : number,
    exp_orale : number,
    gestuelle : number,
    prop_voiture : number
    conaissance_produit : number,
    conaissance_concurrence : number,
    etablir_securite : number,
    mise_en_place : number,
    nego_pack : number,
    ecoute : number,
    observation : number,
    questionnement : number,
    feedback_prescrip : number,
    traitement_objections : number,
    conclusion : number,
    utilisation_mp : number,
    plan_journee : number,
    ciblage : number,
    maitrise_clients : number,
    maitrise_terrain : number,
    administratif : number,
    objectifs : string,
    idDelegue :string,
    createdAt:Date
    updatedAt: Date
}