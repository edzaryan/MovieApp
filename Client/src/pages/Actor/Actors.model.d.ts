
export interface actorDTO {
    id: number;
    name: string;
    biography: string;
    dateOfBirth: string;
    picture: string;
}

export interface actorCreationDTO {
    name: string;
    dateOfBirth?: Date;
    picture?: File;
    pictureURL?: string;
    biography?: string;
}

export interface actorMovieDTO {
    id: number;
    name: string;
    character: string;
    picture: string;
}