export interface UserType {
    email: string | null;
    uid: string | null;
    avatar: string | null;
    displayName: string | null;
    bio: string | null;
    header: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    schwerpunkte: UserSchwerpunkt[];
}

export type UserSchwerpunkt = {
    id: string;
    color: string;
    position?: number;
    data?: Schwerpunkt;
}

//Ein Schwerpunkt, wie er in der schwerpunkte collection gespeichert wird
export type Schwerpunkt = {
    id?: string;
    name: string;
    usedBy: string[];

    createdAt: string;
    methoden: string[] | Methode[];
}

//Eine Methode, wie sie in der methoden collection gespeichert wird
export type Methode = {
    name: string;
    id?: string;
    used_by: string[];
    createdAt: string;
    details: string[] | Detail[];
}

//Ein Detail, wie es in der details collection gespeichert wird
export type Detail = {
    name: string;
    id: string;
    used_by: string[];
    createdAt: string;
    makroschritte: string[] | Makroschritt[];
}

//Ein Makroschritt, wie er in der makroschritte collection gespeichert wird
export type Makroschritt = {
    name: string;
    id: string;
    used_by: string[];
    createdAt: string;
}