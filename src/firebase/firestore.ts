import { addDoc, collection, doc, deleteDoc, getDocs, getDoc, CollectionReference } from "firebase/firestore/lite";
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
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
      comments: [],
      createdAt: Date.now()
    });

    console.log('document created!');
    console.log(postRef);
  } catch (error: any) {
    console.log('file upload crashed:');
    console.log(error.message);
  }
}

export const getAllPosts = async () => {
  try {
    const allPosts = await getDocs(collection(db, 'posts') as CollectionReference<IMarker>);

    const allPostsData: IMarker[] = allPosts.docs.map((post) => {
      return { ...post.data(), id: post.id };
    });
    return allPostsData;
  } catch (error: any) {
    console.log(error.code);
    console.log(error.message);
    return [];
  }
}

export const deletePost = async (post: IMarker | null) => {
  if (post) {
    try {
      const imageRef = ref(storage, post.imageUrl);
      await deleteObject(imageRef);
      try {
          const postRef = doc(db, 'posts', post.id);
          await deleteDoc(postRef);
      } catch (error: any) {
        throw error;
      }
    } catch (error: any) {
      throw error;
    }
  }
}