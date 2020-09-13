export interface Task {
    id: number,
    nom_tache : string,
    contenu :string,
    date_rappel : Date,
    date_echance : Date,
    attached_file :string,
    isdone :boolean,
    private : boolean
    createdAt: Date
    updatedAt: Date
}