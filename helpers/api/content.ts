import { addDoc, arrayRemove, arrayUnion, CollectionReference, doc, DocumentReference, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { detailDoc, detailsColl, makroschrittDoc, makroschritteColl, methodeDoc, methodenColl, schwerpunktDoc, schwerpunkteColl, userDoc } from "../collections";
import { Detail, Makroschritt, Methode, Schwerpunkt, UserSchwerpunkt } from "../types";
import { uuidv4 } from "@firebase/util";
import { db } from "../../config/firebase";
import { User } from "../../services/types";
import { prepStringForSearch } from "../util";

export type Result = {
    status: 'success' | 'error';
    data?: any;
    error?: any;
}

export const colorOptions = [
    "#C4BCB1",
    "#CAD334",
    "#C55EEB",
    "#D47721",
    "#F73B66",
];

export async function getSchwerpunkte(schwerpunkte: UserSchwerpunkt[]): Promise<UserSchwerpunkt[] | null> {
    console.log('Getting schwerpunkte: ' + schwerpunkte);
    try {
        let schwerpunkteDocs = await getDocs(query(schwerpunkteColl, where('id', 'in', schwerpunkte.map((s) => s.id))));
        console.log('Schwerpunkte: ' + schwerpunkteDocs.docs.length);

        schwerpunkteDocs.forEach((doc) => {
            let schwerpunkt = doc.data() as Schwerpunkt;
            schwerpunkt.id = doc.id;
            schwerpunkte.find((s) => s.id === schwerpunkt.id)!.data = schwerpunkt;
        });

        return schwerpunkte;
    } catch (error) {
        console.log('Error while getting schwerpunkte: ' + error);
        return null;
    }
}

export async function getSchwerpunkt(id: string): Promise<Schwerpunkt | null> {
    try {
        let doc = await getDoc(schwerpunktDoc(id));

        let schwerpunkt = doc.data() as Schwerpunkt;

        schwerpunkt.id = doc.id;

        //Load methoden
        let methoden: Methode[] = [];
        for (let m of schwerpunkt.methoden) {
            let m_doc = await getDoc(methodeDoc(m as string));
            let methode = m_doc.data() as Methode;
            methode.id = m_doc.id;
            methoden.push(methode);
        }

        schwerpunkt.methoden = methoden;

        return schwerpunkt;
    } catch (error) {
        console.log('Error while getting schwerpunkt: ' + error);
        return null;
    }
}

export async function deleteSchwerpunktFromUser(uid: string, schwerpunkt_id: string, oldSchwerpunkte: UserSchwerpunkt[]): Promise<Result> {
    try {
        await updateDoc(userDoc(uid), {
            schwerpunkte: oldSchwerpunkte.filter((s) => s.id !== schwerpunkt_id)
        });
        return { status: 'success' };
    } catch (error) {
        console.log('Error while deleting schwerpunkt from user: ' + error);
        return { status: 'error', error: error };
    }
}

export async function getMethode(id: string): Promise<Methode | null> {
    try {
        let doc = await getDoc(methodeDoc(id));
        let methode = doc.data() as Methode;
        methode.id = doc.id;

        //Load details
        let details: Detail[] = [];
        for (let d of methode.details) {
            let d_doc = await getDoc(detailDoc(d as string));
            let detail = d_doc.data() as Detail;
            detail.id = d_doc.id;
        }

        methode.details = details;

        return methode;
    } catch (error) {
        console.log('Error while getting methode: ' + error);
        return null;
    }
}

export async function getDetail(id: string): Promise<Detail | null> {
    try {
        let doc = await getDoc(detailDoc(id));
        let detail = doc.data() as Detail;
        detail.id = doc.id;

        //Load makroschritte
        let makroschritte: Makroschritt[] = [];
        for (let m of detail.makroschritte) {
            let m_doc = await getDoc(makroschrittDoc(m as string));
            let makro = m_doc.data() as Makroschritt;
            makro.id = m_doc.id;
        }

        detail.makroschritte = makroschritte;

        return detail;
    } catch (error) {
        console.log('Error while getting detail: ' + error);
        return null;
    }
}

//Called when user sets up a new schwerpunkt
export async function createSchwerpunkt(uid: string, s: Schwerpunkt, color: string | undefined): Promise<string | undefined> {
    if (!uid || !s) return undefined;

    if (s.id) {
        console.log('Schwerpunkt already exists...');
        await _updateUsedBy(schwerpunktDoc(s.id), uid);
    } else {
        try {
            let uuid = uuidv4();
            await setDoc(schwerpunktDoc(uuid), {
                id: uuid,
                name: s.name,
                searchable: prepStringForSearch(s.name),
                usedBy: [uid],
                methoden: [],
                createdAt: new Date().toISOString(),
            });
            s.id = uuid;
        } catch (error) {
            console.log('Error while creating schwerpunkt doc: ' + error);
            return undefined;
        }
    }

    //Add schwerpunkt to user
    try {
        let c = color ?? colorOptions[Math.floor(Math.random() * colorOptions.length)];
        await updateDoc(userDoc(uid), {
            schwerpunkte: arrayUnion({
                id: s.id,
                color: c,
            } as UserSchwerpunkt)
        });
        return c;
    } catch (error) {
        console.log('Error while adding schwerpunkt to user doc: ' + error);
        return undefined;
    }
}

export async function updateSchwerpunktColor(uid: string, schwerpunkt_id: string, oldSchwerpunkte: UserSchwerpunkt[], c: string) {
    try {
        await updateDoc(userDoc(uid), {
            schwerpunkte: oldSchwerpunkte.map((s) => {
                return {
                    id: s.id,
                    color: s.id === schwerpunkt_id ? c : s.color,
                } as UserSchwerpunkt;
            })
        });
    } catch (error) {
        console.log('Error while updating schwerpunkt color: ' + error);
    }
}

export async function addMethodeToSchwerpunkt(uid: string, schwerpunkt_id: string, methode: Methode): Promise<Result> {

    await updateDoc(schwerpunktDoc(schwerpunkt_id), {
        methoden: arrayUnion(methode.id)
    });

    return { status: 'success' };
}

export async function addDetailToMethode(methode_id: string, detail: Detail): Promise<Result> {

    await updateDoc(methodeDoc(methode_id), {
        details: arrayUnion(detail.id)
    });

    return { status: 'success' };
}

export async function addMakroToDetail(detail_id: string, makro: Makroschritt): Promise<Result> {

    await updateDoc(detailDoc(detail_id), {
        makroschritte: arrayUnion(makro.id)
    });

    return { status: 'success' };
}



//Created a new methode, detail, makroschritt
export async function createSubElement(uid: string, element: Methode | Detail | Makroschritt, docFun: (id: string) => DocumentReference): Promise<Methode | Detail | Makroschritt | null> {
    if (element.id) {
        await _updateUsedBy(docFun(element.id), uid);
    } else {
        try {
            let uuid = uuidv4();
            await setDoc(docFun(uuid), {
                id: uuid,
                name: element.name,
                searchable: prepStringForSearch(element.name),
                usedBy: [uid],
                createdAt: new Date().toISOString(),
            });
            element.id = uuid;
        } catch (error) {
            console.log('Error while creating: ' + error);
        }
    }

    element.used_by = element.used_by ? [...element.used_by, uid] : [uid];

    return element;
}

async function _updateUsedBy(doc: DocumentReference, uid: string) {
    console.log('updating usedBy...');

    if (!doc || !uid) return;

    try {
        await updateDoc(doc, {
            usedBy: arrayUnion(uid),
        });
    } catch (error) {
        console.log('Error while updating usedBy: ' + error);
    }
}

export async function searchElement<T>(coll: CollectionReference, name: string): Promise<T[]> {

    if (!name) return [];

    name = prepStringForSearch(name);

    try {
        console.log('Searching for: ' + name + ' in collection: ' + coll.path);
        let q = (query(coll, where('searchable', '>=', name), where('searchable', '<=', name + '\uf8ff')));
        let docs = await getDocs(q);

        console.log('Found: ' + docs.size + ' docs');

        let elements: T[] = [];

        docs.forEach(doc => {
            elements.push({
                id: doc.id,
                ...doc.data()
            } as T);
        }
        );

        return elements;
    } catch (error) {
        console.log(`Error while searching "${name}" in collection: ${coll.path} `);
        console.log(error);
        return [];
    }
}