import { getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { userDoc } from '../collections';
import { UserType } from '../types';

export async function createUser(user: UserType) {
  if (!user.uid) return;

  try {
    await setDoc(userDoc(user.uid), {
      ...user,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.log('Error while creating user doc: ' + error);
  }
}

export async function updateUser(user: UserType) {
  console.log(
    'Updating user: ' + user.uid + ' with data: ' + JSON.stringify(user)
  );
  if (!user.uid) {
    console.log('user has no id');
    return;
  }

  //make all undefined fields null
  for (let key in user) {
    if (user[key as keyof UserType] === undefined) {
      user[key as keyof UserType] = null;
    }
  }

  try {
    await updateDoc(userDoc(user.uid), {
      ...user,
      updatedAt: new Date().toISOString(),
    });
    console.log(`Updated user ${user.uid} with data: ${JSON.stringify(user)}`);
  } catch (error) {
    console.log('Error while updating user doc: ' + error);
  }
}

export async function uploadImageToFirebaseStorage(file: File, path: string) {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  } catch (error) {
    console.log('Error while uploading image to storage: ' + error);
  }
}

export async function getUser(id: string): Promise<UserType | null> {
  if (!id) return null;
  try {
    let user = await getDoc(userDoc(id));
    if (user.exists()) {
      return user.data() as UserType;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error while getting user doc: ' + error);
    return null;
  }
}
