export interface RapportDelegue{
    id:number,
    idRapport :number,
    idDelegue :number,
    manifestation : string,
    conges : boolean,
    nb_jours_conges :number,
    realise_obj_1 : number,
    realise_obj_2 :number,
    total_realise :number,
    pharma_gro_realisees : number,
    realise_ventes :number,
    rapport_envoye : boolean,
    respect_plan_tournee : boolean,
    visite_detail : boolean,
    promesse_packs : boolean,
    respect_plan_charge : boolean,
    remarques_pertinentes : boolean,
    veille_c : boolean,
    capture_ecran : boolean,
    pourcentage_satisfaction :number,
    createdAt: Date
    updatedAt: Date
}