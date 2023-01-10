import axios from "axios";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/firebase";

export const userColl = collection(db, 'users');
export const userDoc = (id: string) => doc(userColl, id);

export const schwerpunkteColl = collection(db, 'schwerpunkte');
export const schwerpunktDoc = (id: string) => doc(schwerpunkteColl, id);

export const methodenColl = collection(db, 'methoden');
export const methodeDoc = (id: string) => doc(methodenColl, id);

export const detailsColl = collection(db, 'details');
export const detailDoc = (id: string) => doc(detailsColl, id);

export const makroschritteColl = collection(db, 'makroschritte');
export const makroschrittDoc = (id: string) => doc(makroschritteColl, id);