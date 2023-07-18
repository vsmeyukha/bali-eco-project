import { addDoc, collection } from "firebase/firestore/lite";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import shortid from "shortid";

import { db, auth, storage } from "./config";
import { IMarker } from "@/pages/map";

export const addPost = async (marker: IMarker, file: File) => {
  try {
    const imageRef = ref(storage, `user${auth.currentUser?.uid}/photo${shortid()}`);
    const uploadedPhoto = await uploadBytes(imageRef, file);
    console.log('file successfully uploaded!');

    const photoUrl = await getDownloadURL(uploadedPhoto.ref);

    const postRef = await addDoc(collection(db, 'posts'), {
      owner: auth.currentUser?.uid,
      coordinates: marker.coordinates,
      coordsToPixels: marker.coordsToPixels,
      title: marker.title,
      comment: marker.comment,
      imageUrl: photoUrl,
      comments: []
    });

    console.log('document created!');
    console.log(postRef);
  } catch (error: any) {
    console.log('file upload crashed:');
    console.log(error.message);
  }
}