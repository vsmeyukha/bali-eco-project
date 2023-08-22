// ? Import necessary Firestore and Firebase Storage functions
import {
  addDoc,
  setDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot
} from "firebase/firestore/lite";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  StorageReference,
  UploadResult
} from 'firebase/storage';

// ? Local Firebase configuration imports
import { db, auth, storage } from "./config";

// ? Types imports
import { IPost, IMarker } from "@/pages/map";

// ? Type declaration for image-related data
type ImageInfo = {
  imageRef: StorageReference,
  photoUrl: string
};

// ? Create a new marker in the 'markers' collection.
const addMarker = async (marker: IMarker) => {
  try {
    const markerRef = await addDoc(collection(db, 'markers'), {
      coordinates: marker.coordinates
    });

    return markerRef;

  } catch (error: any) {
    console.log('marker was not created');
    console.log(error.message);
  }
}

// ? Upload a photo to Firebase Storage and retrieve its URL.
const uploadPhoto = async (file: File, markerRef: DocumentReference<IMarker>) => {
  try {
    const markerId = markerRef.id;
    const imageRef: StorageReference = ref(storage, `user${auth.currentUser?.uid}/photo${markerId}`);
    const uploadedPhoto: UploadResult = await uploadBytes(imageRef, file);

    const photoUrl: string = await getDownloadURL(uploadedPhoto.ref);

    return {imageRef, photoUrl};
  } catch (error: any) {
    await deleteDoc(markerRef);
    console.log('marker deleted!');

    console.log('file upload crashed:');
    console.log(error.message);
  }
}

// ? Add a new post document in the 'posts' collection.
const addPostDoc = async (
  post: IPost,
  markerRef: DocumentReference<IMarker>,
  {imageRef, photoUrl}: ImageInfo
) =>
{
  try {
    const markerId = markerRef.id;
    const postRef = await setDoc(doc(db, 'posts', markerId), {
      owner: auth.currentUser?.uid,
      title: post.title,
      comment: post.comment,
      imageUrl: photoUrl,
      createdAt: Date.now()
    });
    return markerId;
  } catch (error: any) {
    await deleteDoc(markerRef);
    console.log('marker deleted!');

    await deleteObject(imageRef);
    console.log('image deleted!');

    console.log('post was not created');
    console.log(error.message);
  }
}

// ? Unified function to add a new post.
// ? - Adds a marker.
// ? - Uploads an attached image.
// ? - Adds a corresponding post document.
export const addPost = async (marker: IMarker, post: IPost, file: File) => {
  const markerRef = await addMarker(marker) as DocumentReference<IMarker>;

  if (!markerRef) {
    return;
  }

  const imageInfo = await uploadPhoto(file, markerRef);

  if (!imageInfo) {
    return;
  }
  
  const { imageRef, photoUrl } = imageInfo;

  if (!imageRef || !photoUrl) {
    return;
  }

  const markerId = await addPostDoc(post, markerRef, { imageRef, photoUrl });
  return markerId;
}

// ? Fetch all posts from the 'posts' collection.
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

// ? Fetch all markers from the 'markers' collection.
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

// ? Delete a post and its related data, such as its image and marker.
export const deletePost = async (post: IPost | null) => {
  if (post) {
    try {
      if (post.id) {
        const markerRef = doc(db, 'markers', post.id);
        await deleteDoc(markerRef);
      }
      try {
        const imageRef = ref(storage, post.imageUrl);
        await deleteObject(imageRef);

        try {
          if (post.id) {
            const postRef = doc(db, 'posts', post.id);
            await deleteDoc(postRef);
          }
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

// ? Fetch a specific post based on its associated marker.
export const getCurrentPost = async (marker: IMarker) => {
  try {
    if (marker.id) {
      const docRef = doc(db, 'posts', marker.id) as DocumentReference<IPost>;
      const postSnapshot = await getDoc(docRef) as DocumentSnapshot<IPost>;
      const currentPost: IPost | undefined = postSnapshot.data() as IPost | undefined;

      if (currentPost !== undefined) {
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

// ? Add a comment to a specific post.
export const addComment = async (post: IPost, author: string, comment: string) => {
  try {
    if (post.id) {
      const commentsCollectionRef = collection(db, 'posts', post.id, 'comments');
      await addDoc(
        commentsCollectionRef,
        {
          comment,
          owner: author
        }
      );
    }
    
  } catch (error: any) {
    console.log(error.code);
    console.log(error.message);
  }
}