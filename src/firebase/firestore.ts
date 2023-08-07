import {
  addDoc,
  setDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  CollectionReference
} from "firebase/firestore/lite";

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { db, auth, storage } from "./config";
import { IPost, IMarker } from "@/pages/map";

// todo по ходу, в catch, если добавился маркер, но не добавился документ, нужно удалять маркер. 

export const addPost = async (marker: IMarker, post: IPost, file: File) => {
  try {
    const markerRef = await addDoc(collection(db, 'markers'), {
      coordinates: marker.coordinates
    });
    console.log('marker with coords created!');
    
    const markerId = markerRef.id;

    try {
      const imageRef = ref(storage, `user${auth.currentUser?.uid}/photo${markerId}`);
      const uploadedPhoto = await uploadBytes(imageRef, file);

      console.log('file successfully uploaded!');

      const photoUrl = await getDownloadURL(uploadedPhoto.ref);

      try {
        const postRef = await setDoc(doc(db, 'posts', markerId), {
          owner: auth.currentUser?.uid,
          title: post.title,
          comment: post.comment,
          imageUrl: photoUrl,
          createdAt: Date.now()
        });
    
        console.log('document created!');
        console.log(doc(db, 'posts', markerId));

        return markerId;
      } catch (error: any) {
        await deleteDoc(markerRef);
        console.log('marker deleted!');

        await deleteObject(imageRef);
        console.log('image deleted!');

        console.log('post was not created');
        console.log(error.message);
      }
    } catch (error: any) {
      await deleteDoc(markerRef);
      console.log('marker deleted!');

      console.log('file upload crashed:');
      console.log(error.message);
    }
  } catch (error: any) {
    console.log('marker was not created');
    console.log(error.message);
  }
}

export const getAllPosts = async () => {
  try {
    const allPosts = await getDocs(collection(db, 'posts') as CollectionReference<IPost>);

    const allPostsData: IPost[] = allPosts.docs.map((post) => {
      return { ...post.data(), id: post.id };
    });
    return allPostsData;
  } catch (error: any) {
    console.log(error.code);
    console.log(error.message);
    return [];
  }
}

export const getAllMarkers = async () => {
  try {
    const allMarkers = await getDocs(collection(db, 'markers') as CollectionReference<IMarker>);

    const allMarkersData: IMarker[] = allMarkers.docs.map((marker) => {
      return { ...marker.data(), id: marker.id };
    });

    return allMarkersData;
  } catch (error: any) {
    console.log(error.code);
    console.log(error.message);
    return [];
  }
}

export const deletePost = async (post: IPost | null) => {
  if (post) {
    try {
      const markerRef = doc(db, 'markers', post.id);
      await deleteDoc(markerRef);

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
    } catch (error: any) {
      throw error;
    }
  }
}

export const getCurrentPost = async (marker: IMarker) => {
  try {
    if (marker.id) {
      const docRef = doc(db, 'posts', marker.id);
      const postSnapshot = await getDoc(docRef);
      const currentPost: IPost | undefined = postSnapshot.data();

      if (currentPost !== undefined) {
        console.log(currentPost);
        return currentPost;
      }
    }
    else {
      console.log('error! no marker!');
    }
  } catch (error: any) {
    console.log(error.code);
    console.log(error.message);
  }
}